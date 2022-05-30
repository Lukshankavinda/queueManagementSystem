import {Request, Response} from 'express';
import {Brackets } from "typeorm";

import { AppDataSource } from '../data-source';
import { issues } from '../entities/issues';
import { counters } from '../entities/counters';
import {getIssuesDto} from '../dto/getIssuesDto'
import {getOneIssuesDto} from '../dto/getOneIssuesDto'


class issuesController{

    static addIssue = async (req:Request, res:Response) => {

        let issue : issues|any;
        issue = await AppDataSource
            .getRepository( issues)
            .createQueryBuilder('issue')
            .select('issue.counter')
            .addSelect('COUNT(issue.issue_no)', 'issues')
            .groupBy('issue.counter')
            .execute();
        
        let count : counters|any;    
        count = await AppDataSource
            .getRepository( counters)
            .createQueryBuilder('count')
            .select('id')
            .where({ status: ['active']})
            .execute();
        
        var lenCount = Object.keys(count).length;
        var lenIssue = Object.keys(issue).length;
        
        if (lenCount == 0 ) {
            res.status(401).send('all counters are close');
        } 
        else {
            if (lenIssue == 0 || lenCount > lenIssue) {

                let actCount : counters|any;
                actCount = await AppDataSource
                    .createQueryBuilder()
                    .select('actCount.id')
                    .from(counters, 'actCount')
                    .where({ status: ['active']})
                    .orderBy('updateAt', "DESC") 
                    .getOne()

                
                await AppDataSource
                    .createQueryBuilder()
                    .insert()
                    .into(issues)
                    .values([
                        {
                            name: res.locals.jwt.name, 
                            tpno: res.locals.jwt.tpno, 
                            email: res.locals.jwt.email, 
                            issue: req.body.issue,
                            issue_no: 1,
                            normalUsers: res.locals.jwt.id,
                            counter: actCount.id,

                        }, 
                    ])
                    .execute();
                return res.json(
                    'new issue added successfully  Issue No :- '
                    +1+
                    ' and Counter Id :- '+actCount.id
                );
            } else {
                let array:Number[] = [];

                for (let index = 0; index < lenCount; index++) {
                    array.push(Number(Object.values(count[index])))
                }
                
                let minValue: Number = 999999;
                let minCount: Number = 999999;
            
                for (let index = 0; index< lenIssue; index++) {
                    if (array.includes(issue[index].counterId)) {
                        if (minValue > issue[index].issues ) {
                            minValue = issue[index].issues ;
                            minCount = issue[index].counterId ;
                        }
                    }
                }
                res.locals.minValue = minValue;
                res.locals.minCount = minCount;

                await AppDataSource
                    .createQueryBuilder()
                    .insert()
                    .into(issues)
                    .values([
                        {
                            name: res.locals.jwt.name, 
                            tpno: res.locals.jwt.tpno, 
                            email: res.locals.jwt.email, 
                            issue: req.body.issue,
                            issue_no: Number(res.locals.minValue) + 1,
                            normalUsers: res.locals.jwt.id,
                            counter: res.locals.minCount,

                        }, 
                    ])
                    .execute();
                return res.json(
                    'new issue added successfully  Issue No :- '
                    +(Number(res.locals.minValue) + 1)+
                    ' and Counter Id :- '+res.locals.minCount
                );
            }
        }
    };

    static getAllIssues = async (req:Request,res:Response) => {

        const user = await AppDataSource
            .createQueryBuilder()
            .select("user")
            .from(issues, "user")
            .where("user.status = :status OR user.status = :status1",{ status: "inprogress", status1: "waiting" })
            .andWhere("user.counter = :counter", { counter:res.locals.jwt.counter_id })
            .orderBy({ "status": 'ASC'})
            .getMany()
        console.log(user)
        let responseData : Array<getIssuesDto> = new Array();

        for (const  use of user) {
            responseData.push(new getIssuesDto(use));
        }
        
        return res.send(responseData);
    
    };

    static getOneIssues = async (req:Request,res:Response) => {

        const {id} = req.params;
        
        const oneUser = await AppDataSource
            .createQueryBuilder()
            .select("oneUser")
            .from(issues, "oneUser")
            .where("id = :id", { id :id})
            .execute();
        
        await AppDataSource
            .createQueryBuilder()
            .update(issues)
            .set({ status:  ["inprogress"]})
            .where("id = :id", { id: id })
            .execute()
         
        const oneUserInp = await AppDataSource
            .createQueryBuilder()
            .select("oneUserInp.counterId")
            .from(issues, "oneUserInp")
            .where("id = :id", { id :id})
            .execute();

        const oneUserInp2 = await AppDataSource
            .createQueryBuilder()
            .select("oneUserInp2.issue_no")
            .from(issues, "oneUserInp2")
            .where("id = :id", { id :id})
            .execute();

        let valCid = Number(Object.values(oneUserInp[0])) 
        let valIno = Number(Object.values(oneUserInp2[0]))    
        
        await AppDataSource
            .createQueryBuilder()
            .update(counters)
            .set({ ongoin:valIno})
            .where("counter_number = :counter_number", { counter_number:valCid })
            .execute()
    
        let responseOneData : Array<getOneIssuesDto> = new Array();

        for (const  oneUse of oneUser) {
            responseOneData.push(new getOneIssuesDto(oneUse));
        }
        console.log(responseOneData)
        return res.send(responseOneData);
    
    };

    static deleteIssues = async (req:Request,res:Response) => {

        const {id} = req.params;
        await AppDataSource
            .createQueryBuilder()
            .update(issues)
            .set({ status:  ["close"]})
            .where("id = :id", { id: id })
            .execute()
    
        res.send('del')

    };
    
    static doneNext = async (req:Request,res:Response) => {

        const {id} = req.params;
        await AppDataSource
            .createQueryBuilder()
            .update(issues)
            .set({ status:  ["close"]})
            .where("id = :id", { id: id })
            .execute()
        
        const oneUser = await AppDataSource
            .createQueryBuilder()
            .select("oneUser")
            .from(issues, "oneUser")
            .where('oneUser.counter = :counter', {counter:res.locals.jwt.counter_id })
            .andWhere(
                new Brackets((qb) => {
                    qb.where("oneUser.status = :status", { status: "inprogress",})
                    qb.orWhere("oneUser.status = :status1", { status1: "waiting"  })
                }),)
            .orderBy({ "status": 'DESC'})
            .getOne(); 
        console.log(oneUser)

        await AppDataSource
            .createQueryBuilder()
            .update(issues)
            .set({ status:  ["inprogress"]})
            .where("id = :id", { id: oneUser?.id })
            .execute()

        const oneUserInp = await AppDataSource
            .createQueryBuilder()
            .select("oneUserInp.counterId")
            .from(issues, "oneUserInp")
            .where("id = :id", { id :oneUser?.id})
            .execute();

        const oneUserInp2 = await AppDataSource
            .createQueryBuilder()
            .select("oneUserInp2.issue_no")
            .from(issues, "oneUserInp2")
            .where("id = :id", { id :oneUser?.id})
            .execute();

        let valCid = Number(Object.values(oneUserInp[0])) 
        let valIno = Number(Object.values(oneUserInp2[0]))    
        
        await AppDataSource
            .createQueryBuilder()
            .update(counters)
            .set({ ongoin:valIno})
            .where("counter_number = :counter_number", { counter_number:valCid })
            .execute()
    
            let responseData : Array<getOneIssuesDto> = new Array();

            responseData.push(new getOneIssuesDto({
                oneUser_id:oneUser?.id,
                oneUser_name:oneUser?.name,
                oneUser_issue_no:oneUser?.issue_no,
                oneUser_tpno:oneUser?.tpno,
                oneUser_issue:oneUser?.issue
                
            }))
            
            console.log(responseData)
            return res.send(responseData);
        
        
    };
}
export default issuesController;