import {Request, Response} from 'express';

import { AppDataSource } from '../data-source';
import { counters } from '../entities/counters'
import { normal_users } from '../entities/normal_users';

class counterController{

    static onGoingQueue = async (req:Request,res:Response) => {

        

    };

}

export default counterController