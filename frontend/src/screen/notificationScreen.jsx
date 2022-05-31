import React, { useState, useEffect } from 'react'
import axios from "axios";
//import Form from 'react-bootstrap/Form'
//import { Button, Stack, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
//import {useNavigate, Link} from 'react-router-dom'
import UserNavbar from './userNavbar';
import io from 'socket.io-client' 
const socket = io.connect("http://localhost:5000");


function NotificationScreen() {

  const userToken= localStorage.getItem('userJWT')

  axios.interceptors.request.use(
    config  => {
        config.headers.authorization =`Bearer ${userToken}`;
        console.log(config)
        return config;
    },
    error =>{
        return Promise.reject(error)
    }
  )

  const [messageReceive, setMessageReceive] = useState()

  useEffect(() => {
    socket.on('receive_message',(data) =>{
      setMessageReceive(data.message);
    })
  })

  return (
    <div>
      < UserNavbar/>
      <h4 style={{marginTop:"5%", textAlign:"left", marginLeft:"10%"}}> Notification</h4>
      <br/>
      <h5 style={{marginTop:"5%", textAlign:"left", marginLeft:"10%"}}>{messageReceive}</h5>
    </div>
  )
}

export default NotificationScreen