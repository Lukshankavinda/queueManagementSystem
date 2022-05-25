import {Request, Response} from 'express';

import { AppDataSource } from '../data-source';
import { issues } from '../entities/issues';
import { counters } from '../entities/counters';
import {getIssuesDto} from '../dto/getIssuesDto'


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
        console.log(issue)
        let count : counters|any;    
        count = await AppDataSource
            .getRepository( counters)
            .createQueryBuilder('count')
            .select('id')
            .where({ status: ['active']})
            .execute();
        console.log(count)
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
            .orderBy({ "status": 'DESC'})
            .getMany()

        let responseData : Array<getIssuesDto> = new Array();

        for (const  use of user) {
            responseData.push(new getIssuesDto(use));
        }
        
        return res.send(responseData);
    
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
}
export default issuesController;