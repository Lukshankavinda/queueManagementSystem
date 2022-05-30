import {Request, Response} from 'express';

import { AppDataSource } from '../data-source';
import { counters } from '../entities/counters'
import { normal_users } from '../entities/normal_users';
import { issues } from '../entities/issues'
import {onGoingDto} from '../dto/onGoingDto'
import {Brackets } from "typeorm";


class counterController{

    static onGoingQueue = async (req:Request,res:Response) => {

        let issuCid : issues|any;
        issuCid = await AppDataSource
            .createQueryBuilder()
            .select('issuCid.counterId')
            .from(issues,'issuCid')
            .where('issuCid.normalUsers = :normalUsers', {normalUsers: res.locals.jwt.id })
            .andWhere(
                new Brackets((qb) => {
                    qb.where("issuCid.status = :status", { status: "inprogress",})
                    qb.orWhere("issuCid.status = :status1", { status1: "waiting"  })
                }),)
            .execute()
        console.log(issuCid)

        let issueIno : issues|any;
        issueIno = await AppDataSource
            .createQueryBuilder()
            .select('issueIno.issue_no')
            .from(issues,'issueIno')
            .where('issueIno.normalUsers = :normalUsers', {normalUsers: res.locals.jwt.id })
            .andWhere(
                new Brackets((qb) => {
                    qb.where("issueIno.status = :status", { status: "inprogress",})
                    qb.orWhere("issueIno.status = :status1", { status1: "waiting"  })
                }),)
            .execute()
        console.log(issuCid)
        let issueIId : issues|any;
        issueIId = await AppDataSource
            .createQueryBuilder()
            .select('issueIId.id')
            .from(issues,'issueIId')
            .where('issueIId.normalUsers = :normalUsers', {normalUsers: res.locals.jwt.id })
            .andWhere(
                new Brackets((qb) => {
                    qb.where("issueIId.status = :status", { status: "inprogress",})
                    qb.orWhere("issueIId.status = :status1", { status1: "waiting"  })
                }),)
            .execute()
        console.log(issueIId)
        let valIssuCid = Number(Object.values(issuCid[0])) 
        let valIssueIno = Number(Object.values(issueIno[0]))
        let valIssueIID = Number(Object.values(issueIId[0]))

        let counter : counters|any;
        counter = await AppDataSource
            .createQueryBuilder()
            .select('counter.ongoin')
            .from(counters,'counter')
            .where('counter.id = :id', {id:valIssuCid})
            .execute()

        let valCounter = Number(Object.values(counter[0]))
        let responseData : Array<onGoingDto> = new Array();

        responseData.push(new onGoingDto({
                id:valIssueIID,
                counterId:valIssuCid,
                issue_no: valIssueIno,
                ongoin: valCounter
            }));
    
        
        return res.send(responseData);
    };

    static closeCounter = async (req:Request,res:Response) => {

        await AppDataSource
                .createQueryBuilder()
                .update(counters)
                .set({ status: ['close'] })
                .where("id = :id", { id:res.locals.jwt.counter_id })
                .execute()
        
        res.json({
            message: 'done'
        })

    };

    static isIssueAdded  = async (req:Request,res:Response) => {

        const {email} = req.params;
        let issueEX : issues|any;
        issueEX = await AppDataSource
            .createQueryBuilder()
            .select('issueEX')
            .from(issues,'issueEX')
            .where('issueEX.email = :email', {email: email })
            .andWhere(
                new Brackets((qb) => {
                    qb.where("issueEX.status = :status", { status: "inprogress",})
                    qb.orWhere("issueEX.status = :status1", { status1: "waiting"  })
                }),)
            .execute()

            var lenIssueEX = Object.keys(issueEX).length;
            if (lenIssueEX != 0) {
                console.log("true")
                return res.send('true')
            } else {
                console.log("false")
                return res.send('false')
            }
    };

}

export default counterController