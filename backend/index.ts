import "reflect-metadata"; 
import express, {Request, Response} from 'express';
import BodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import {Server} from 'socket.io';

import { AppDataSource } from "./data-source";
import normalUserRoutes from './routes/normalUserRoutes'
import counterUserRoutes from './routes/counterUserRoutes'
import issuesRoutes from './routes/issuesRoutes'

const app = express();
app.use(cors());

const server = http.createServer(app)

const io = new Server(server,{
    cors: {
       origin: "http://localhost:3000",
       methods: ["GET", "POST", "PUT"],
    },
 });

app.use(express.json());
app.use(express.urlencoded({extended: true}))

async function main () {
    try {

        await AppDataSource.initialize();

        app.use('/', normalUserRoutes);
        app.use('/', counterUserRoutes);
        app.use('/', issuesRoutes);

        server.listen('5000', () => {
            console.log('server running in port 5000');
        })

        io.on("connection",(socket)=> {
            console.log('user connected:'+ socket.id);
         })
        
    } catch (error) {
        console.error(error)
    }
}
main();
