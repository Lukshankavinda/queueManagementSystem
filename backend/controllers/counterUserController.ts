import {Request, Response} from 'express';
import {validate} from "class-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { AppDataSource } from '../data-source';
import { counter_users } from '../entities/counter_users';
import { counters } from '../entities/counters'


class counterUserController{

    static addCounterUser = async (req:Request, res:Response) => {

        const {name, user_name, password} = req.body;
        let c_user = new counter_users;
       
        c_user.name = name;
        c_user.user_name = user_name;

        c_user.password = bcrypt.hashSync(password, 10);

        const errors = await validate(counter_users);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }
        try {
                await AppDataSource
                    .createQueryBuilder()
                    .insert()
                    .into(counter_users)
                    .values([ c_user ])
                    .execute()

        } catch (e) {
            res.status(409).send('This Counter person Already existed');
            return ;
        }
        res.status(201).send('New Counter person is Registered ')
    };


    static login = async (req:Request, res:Response) => {
        const {user_name, password} = req.body;

        if (!(user_name && password)) {
            res.status(400).send();
        }

        let user: counter_users|any;
        let count: counters|any;

        try {

            user = await AppDataSource
                .getRepository(counter_users)
                .createQueryBuilder("user")
                .where("user.user_name = :user_name", { user_name: user_name })
                .getOne()
            
            count = await AppDataSource
                .createQueryBuilder()
                .select('count')
                .from(counters,'count')
                .where('count.counterUsers = :counterUsers', {counterUsers: Number(user.id) })
                .getOne()

            await AppDataSource
                .createQueryBuilder()
                .update(counters)
                .set({ status: ['active'] })
                .where("id = :id", { id:count.id })
                .execute()

            if (user && !bcrypt.compareSync(password, user.password)) {
                res.status(401).send('Incorrect Password');
                return ;
            }

            const generateJWT = () => {
                return jwt.sign(
                    {
                        user_name: user.user_name,
                        name: user.name,
                        counter_number: count.counter_number,
                        counter_id: count.id
                    },
                    "SECRET",
                    {expiresIn: "24h"}
                );
            };

            res.status(200).json({ access_token: generateJWT()});
        } catch (error) {
            res.status(401).send(error);
        }
    };

}
export default counterUserController;
