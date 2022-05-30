import React, { useState, useEffect } from 'react'
import axios from "axios";
// import Form from 'react-bootstrap/Form'
// import { Button, Stack, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate, Link, useLocation, useParams} from 'react-router-dom'
import CounterNavbar from './counterNavbar';

function CounterIssueScreen(props) {

  const params = useLocation();
  const [post,setpost] =useState({})
  // const [requestError,setRequestError]= useState()
  

  const counterToken = localStorage.getItem('counterJWT')

  axios.interceptors.request.use(
    config  => {
        config.headers.authorization =`Bearer ${counterToken}`;
        console.log(config)
        return config;
    },
    error =>{
        return Promise.reject(error)
    }
  )

  useEffect(()=>{
    axios.get(`http://localhost:5000/counter/getOne/${params.state.page}`)
      .then(respose=>{
        console.log(respose)
        setpost(respose.data)
      }).catch(err=>{
        console.log(err)
      })
      },[])

  

  return (
    <div>
        <CounterNavbar/>
    </div>
  )
}

export default CounterIssueScreen