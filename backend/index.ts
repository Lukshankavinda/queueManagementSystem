import "reflect-metadata"; 
import express, {Request, Response} from 'express';
//import BodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import {Server} from 'socket.io';

import { AppDataSource } from "./data-source";
import normalUserRoutes from './routes/normalUserRoutes'
import counterUserRoutes from './routes/counterUserRoutes'
import issuesRoutes from './routes/issuesRoutes'
import { counters } from './entities/counters';

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

        io.on("connection",(socket)=> {
            console.log('user connected : '+ socket.id);

            socket.on('send_Message',async (data) => {
                //console.log(data)
                socket.broadcast.emit('receive_message',data)

                socket.broadcast.emit('receive_messageNext',{
                    message: "Dear customer Next your turn",
                    issue_No:data.issue_No + 1,
                    counter_No:data.counter_No
                })

                let counter : counters|any;
                counter =await AppDataSource
                    .createQueryBuilder()
                    .select('counter.ongoin')
                    .from(counters,'counter')
                    .where('counter.id = :id', {id:data.counter_No})
                    .execute()

                 let valCounter = Number(Object.values(counter[0]))

                socket.broadcast.emit('receive_Counter',{
                    counter_No:data.counter_No,
                    ongoin_No: valCounter
                })
            })
         })

        server.listen('5000', () => {
            console.log('server running in port 5000'); 
        })

    } catch (error) {
        console.error(error)
    }
}
main();
