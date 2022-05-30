import React, { useState, useEffect } from 'react'
import axios from "axios";
import Form from 'react-bootstrap/Form'
import { Button, Stack, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate, Link} from 'react-router-dom'

function UserLoginScreen(props){

    const [userName,setuserName] =useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(false);
    const [posts,setposts] =useState([])
    const [requestError,setRequestError]= useState()
    const navigater = useNavigate()

    const handleLogin =()=>
    {
        setError(null);
        setLoading(true);

        axios.post("http://localhost:5000/user/login",
        {  
            "email":userName,
			"password":password
        }   
        ).then(response=>{
            setLoading(false);
            localStorage.setItem('userJWT',response.data.access_token)
            const userToken = localStorage.getItem('userJWT')
            console.log("userToken", userToken)
        }).catch(error=>{
            setLoading(false)
            if(error.response.status === 400 || error.response.status === 401 || error.response.status === 409)
            {
                setError(error.response.data);
                setError("Please enter both of  user name and password");
            }
            else{
                setError("Incorrect user name or password");
            }
        });

        axios.get(`http://localhost:5000/user/isAdd/${userName}`,{

        }).then(res=>{
          console.log(res.data)
          setposts(res.data)
          if (res.data === false) {
            console.log('get data if '+res.data)
            navigater('/user/issues');
          } else {
            console.log('get data else '+res.data)
            navigater('/user/queue');
          }
        }).catch(err=>{
          console.log(err)
          setRequestError(err)
        })
    }

    return (
      <div>
            <br/><br/><br/>
            <h1 style={{textAlign: "center"}} >  User Login </h1>
            <br/><br/>

            <Stack direction="horizontal" gap={5} className="d-flex justify-content-center">
                <Form as={Row}>
                    <br/>{error && <div className="error" style={{marginTop:"-10px",color:"red"}} >{error}</div>}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Col sm={{ span: 10, offset: 1}}>
                            <Form.Control 
                                    type="email" 
                                    placeholder="User Name"
                                    value={userName}
                                    onChange={e=>setuserName(e.target.value)} />
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Col sm={{ span: 10, offset: 1}}>
                            <Form.Control 
                                    type="password" 
                                    placeholder="Password" 
                                    value={password}
                                    onChange={e=>setPassword(e.target.value)}/>
                        </Col>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Col sm={{ span:5, offset: 7}}>
                        <Link to="/user/register">To Register</Link> &nbsp;&nbsp;
                            <Button 
                                type="submit"
                                value={loading ?"Loading...": "Login"} 
                                disabled={loading}
                                onClick={handleLogin}>
                                    Login
                            </Button>
                        </Col>
                    </Form.Group>

                </Form>
            </Stack>
      </div>
    )
}
export default UserLoginScreen;