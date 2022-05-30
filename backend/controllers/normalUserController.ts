import {Request, Response} from 'express';
import {validate} from "class-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { normal_users } from '../entities/normal_users';
import { AppDataSource } from '../data-source';

class normalUserController {

    static addNormalUser = async (req:Request, res:Response) => {

        const {name, email, password, tpno} = req.body;
        let n_user = new normal_users();
       
        n_user.name = name;
        n_user.email = email;
        n_user.tpno = tpno;

        n_user.password = bcrypt.hashSync(password, 10);

        const errors = await validate(normal_users);
        if (errors.length > 0) {
            res.status(400).send(errors);
            return;
        }
        try {
                await AppDataSource
                    .createQueryBuilder()
                    .insert()
                    .into(normal_users)
                    .values([ n_user ])
                    .execute()

        } catch (e) {
            res.status(409).send('user Already existed');
            return ;
        }
        res.status(201).send('New User is Registered ')
    };


    static login = async (req:Request, res:Response) => {
        const {email, password} = req.body;

        if (!(email && password)) {
            res.status(400).send('Please enter User name and Password ');
        }
        try {
            let user: normal_users|any;
            user = await AppDataSource
                .getRepository(normal_users)
                .createQueryBuilder("user")
                .where("user.email = :email", { email: email })
                .getOne()
            
            if (user && ! bcrypt.compareSync(password,user.password)) {
                res.status(401).send('Incorrect Password');
                return ;
            }
            const generateJWT = () => {
                return jwt.sign(
                    {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        tpno: user.tpno,
                    },
                    "SECRET",
                    {expiresIn: "5h"}
                );
            };
           
            res.status(200).json({ access_token: generateJWT()});
            
        } catch (error) {
            res.status(401).send(error);
        }
    };
    
}
export default normalUserController;
