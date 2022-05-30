import React, { useState } from 'react'
import axios from "axios";
import Form from 'react-bootstrap/Form'
import { Button, Stack, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate, Link} from 'react-router-dom'
import UserNavbar from './userNavbar';

function IssueScreen(props) {

    const [uname,setName] =useState('');
    const [utpno,setTpno] =useState('');
    const [uemail,setEmail] =useState('');
    const [issueDetails,setIssueDetails] =useState('');
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(false);
    const navigater = useNavigate()

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

    const handlePostIssue = ()=>{

      axios.post("http://localhost:5000/user/addi",{
        name:uname,
        tpno:utpno,
        email:uemail,
        issue:issueDetails,
        headers: {"Authorization" : `Bearer ${userToken}`} 
      }
      ).then(respose=>{
        console.log(respose)
        alert("Your Issue is submitted!")
        navigater('/user/queue')

      }).catch(error=>{
        console.log(error)
      })

    }
    const handleLogout  = ()=>{
      navigater('/')
    }

  return (
    <div>
        < UserNavbar/><br/>
        <Stack direction="horizontal" gap={5} className="d-flex justify-content-center">
          <Form as={Row}>
            <br/>{error && <div className="error" style={{marginTop:"-10px",color:"red"}} >{error}</div>}

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Col sm={{ span: 10, offset: 1}}>
                  <Form.Control 
                        type="text" 
                        placeholder="Name"
                        value={uname}
                        onChange={e=>setName(e.target.value)} />
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Col sm={{ span: 10, offset: 1}}>
                  <Form.Control 
                      type="text" 
                      placeholder="Telephone Number" 
                      value={utpno}
                      onChange={e=>setTpno(e.target.value)}/>
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Col sm={{ span: 10, offset: 1}}>
                  <Form.Control 
                      type="text" 
                      placeholder="Email" 
                      value={uemail}
                      onChange={e=>setEmail(e.target.value)}/>
                </Col>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Col sm={{ span: 10, offset: 1}}>
                  <Form.Control 
                      as="textarea"
                      style={{ height: '200px' }}
                      placeholder="Issue Details" 
                      value={issueDetails}
                      onChange={e=>setIssueDetails(e.target.value)}/>
                </Col>
              </Form.Group>

              <Form.Group className="mb-3">
                <Col sm={{ span:5, offset: 8}}>
                    <Button 
                        type="submit"
                        value="Send Issue"
                        onClick={handlePostIssue}>
                            Submit
                    </Button>
                </Col>
              </Form.Group>

          </Form>
        </Stack>
    </div>
  )
}

export default IssueScreen;