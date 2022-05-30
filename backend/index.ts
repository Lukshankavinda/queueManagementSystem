import "reflect-metadata"; 
import express, {Request, Response} from 'express';
import BodyParser from 'body-parser';
import cors from 'cors';

import { AppDataSource } from "./data-source";
import normalUserRoutes from './routes/normalUserRoutes'
import counterUserRoutes from './routes/counterUserRoutes'
import issuesRoutes from './routes/issuesRoutes'

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}))


async function main () {
    try {

        await AppDataSource.initialize();

        app.use('/', normalUserRoutes);
        app.use('/', counterUserRoutes);
        app.use('/', issuesRoutes);

        app.listen('5000', () => {
            console.log('server running in port 5000');
        })
        
    } catch (error) {
        console.error(error)
    }
}
main();
