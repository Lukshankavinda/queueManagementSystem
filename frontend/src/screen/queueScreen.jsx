import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Button, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom'
import UserNavbar from './userNavbar';
import io from 'socket.io-client' 
const socket = io.connect("http://localhost:5000");


function QueueScreen() {
  
  const [posts,setposts] =useState([])
  const [requestError,setRequestError]= useState()
  const [error,setError]=useState(null);
  const navigater = useNavigate()

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

  useEffect(()=>{
    axios.get("http://localhost:5000/user/ongoing")
    .then(res=>{
      console.log(res)
      setposts(res.data)
  
    }).catch(err=>{
      console.log(err)
      setRequestError(err)
    })
  },[])

  useEffect(() => {
      socket.on('receive_message',(data) =>{
        console.log(data)
        if ((data.issue_No == posts.map(post=>post.id))&&(data.counter_No == posts.map(post=>post.counterId))) {
          alert(data.message)
        }
      })
  })
  useEffect(() => {
    socket.on('receive_messageNext',(data) =>{
      console.log(data)
      if ((data.issue_No == posts.map(post=>post.id))&&(data.counter_No == posts.map(post=>post.counterId))) {
        alert(data.message)
      }
    })
})

  const handleClose =()=>{
    axios.put(`http://localhost:5000/user/deleteIssue/${posts.map(post=>post.id)}`,
    {}).then(response=>{
      navigater('/user/issues')
    }).catch(error=>{
      setError("error");
    });
  }

  return (
    <div>
      < UserNavbar/><br/>
      {posts.map(post=>(
      <>
        <h2 style={{ textAlign: "left", marginLeft: "10%" }}> Ongoing Queue</h2>

        <div className="card" style={{ marginTop: "5px", width: "30%", marginLeft: "35%" }}>
          <div className="card-body">
            <h1 className="card-title">Current Number</h1>
            <h1 style={{ color: "red", fontSize: "150px" }}>{post.ongoin}</h1>
          </div>
        </div><h2 style={{ marginTop: "5px", textAlign: "center" }}> Next: {post.ongoin + 1} </h2>

        <h2 style={{ marginTop: "5px", textAlign: "center" }}> Your No: {post.issue_no} </h2></>))}
        <Col sm={{ span: 5, offset: 8 }}>
            <Button
              type="submit"
              variant="danger"
              className="justify-content-end" 
              style={{ marginBottom: "8px"}}
              onClick={handleClose}
              value="Send Issue">
              Close
            </Button>
        </Col>

    </div>
  )
}

export default QueueScreen