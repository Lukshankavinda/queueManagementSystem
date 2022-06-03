import React, { useState , useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav } from "react-bootstrap";
import {Link} from 'react-router-dom'
import axios from "axios";
import { MdNotifications } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";

function UserNavbar() {

    const [posts,setposts] =useState([])
    const [requestError,setRequestError]= useState()
    const userToken= localStorage.getItem('userJWT')

    console.log("userToken", userToken)

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
        axios.get(" http://localhost:5000/user/getUser")
        .then(res=>{
          console.log(res.data)
          setposts(res.data)
      
        }).catch(err=>{
          console.log(err)
          setRequestError(err)
        })
      },[])


  return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="light">
            <Container> 
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Link 
                            className=" btn-outline-secondary btn-lg" 
                            to="/user/notification"
                            style={{marginTop:"5px"}}> 
                               <MdNotifications/> 
                        </Link>&nbsp;&nbsp;
                        <Link 
                            className="btn btn-outline-secondary rounded-pill " 
                            to="/"
                            style={{marginTop:"5px"}}>    
                               {posts.map(post=>post.name)} <BsPersonCircle/>
                        </Link>&nbsp;&nbsp;
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default UserNavbar