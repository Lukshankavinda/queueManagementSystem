import React, { useState , useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav } from "react-bootstrap";
import {Link} from 'react-router-dom'
import axios from "axios";
import { BsPersonCircle } from "react-icons/bs";


function CounterNavbar() {

    const [posts,setposts] =useState([])
    const [requestError,setRequestError]= useState()
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
        axios.get("http://localhost:5000/counter/getCounter",
        {}).then(res=>{
          console.log(res)
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
                <Navbar.Collapse className="justify-right-end">
                    <Nav>
                        <h5 
                            className="text-secondary"
                            style={{marginTop:"10px"}}>    
                               Counter : {posts.map(post=>post.counter_number)}
                        </h5>&nbsp;&nbsp;
                    </Nav>
                </Navbar.Collapse>
            </Container>
            <Container> 
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Link 
                            className="btn btn-outline-secondary rounded-pill "
                            to="/"
                            style={{marginTop:"10px"}}>    
                               {posts.map(post=>post.name)} <BsPersonCircle/>
                        </Link>&nbsp;&nbsp;
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default CounterNavbar