import "reflect-metadata"; 
import express, {Request, Response} from 'express';
import BodyParser from 'body-parser';
import cors from 'cors';

import { AppDataSource } from "./data-source";

const app = express();
app.use(cors());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}))


async function main () {
    try {

        await AppDataSource.initialize()

        app.listen('5000', () => {
            console.log('server running in port 5000');
        })
        
    } catch (error) {
        console.error(error)
    }
}
main();
