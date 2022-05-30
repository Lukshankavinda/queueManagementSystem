import React, { useState , useEffect } from 'react'
import axios from "axios";
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { Button, Nav, Col, FormControl } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate, Link} from 'react-router-dom'
import CounterNavbar from './counterNavbar';

function CounterScreen(props) {

  const [posts,setposts] =useState([])
  const [requestError,setRequestError]= useState()
  const navigate = useNavigate()

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
    axios.get("http://localhost:5000/counter/getAll",
    {

    }).then(res=>{
      console.log(res)
      setposts(res.data)
  
    }).catch(err=>{
      console.log(err)
      setRequestError(err)
    })
  },[])

  return (
    <div>
          <CounterNavbar/>

          <div >
            <>
            <Nav className="justify-content-center fixed-top" style={{marginTop:"10px"}}>
              <Nav.Item>
                  <Button 
                      variant="danger">
                          close
                  </Button>
              </Nav.Item>
            </Nav>
            </>
            {posts.map(post=>(
            <div>
              <Form.Group className="mb-3 " style={{marginTop:"20px"}}>
                <Col sm={{ span:5, offset: 3}} >
                  <InputGroup >
                    <InputGroup.Text >{post.issue_no}</InputGroup.Text>
                      <FormControl
                        placeholder={post.name} disabled/>
                      <FormControl
                        placeholder={post.tpno} disabled/>
                      {<a onClick={()=>{navigate(`/counter/getone/${post.id}`,{state:{id:post.id}});}}>   
                        <input type="button" 
                            value={ "Call"} 
                            class="btn btn-secondary"/>
                      </a>}
                  </InputGroup>
                </Col>
              </Form.Group>
            </div>))}
          </div>
    </div>
  )
}

export default CounterScreen