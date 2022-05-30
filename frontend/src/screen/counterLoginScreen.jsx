import React, { useState } from 'react'
import axios from "axios";
import Form from 'react-bootstrap/Form'
import { Button, Stack, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {useNavigate, Link} from 'react-router-dom'

function CounterLoginScreen(props){

    const [userName,setuserName] =useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(false);
    const navigater = useNavigate()


    const handleLogin =()=>
    {
        setError(null);
        setLoading(true);

        axios.post("http://localhost:5000/counter/login",
        {  
            "user_name":userName,
            "password":password
        }   
        ).then(response=>{
            setLoading(false);
            localStorage.setItem('counterJWT',response.data.access_token)
            const counterToken= localStorage.getItem('counterJWT')
            console.log("counterToken", counterToken)
            navigater('/counter/getall')
        }).catch(error=>{
            setLoading(false)
            if(error.response.status === 400 || error.response.status === 401 || error.response.status === 409)
            {
                setError(error.response.data.message);
                setError("Please enter both of  user name and password");
            }
            else{
                setError("Incorrect user name or password");
            }
        });
        
    }
    
    return (
      <div>
            <br/><br/><br/>
            <h1 style={{textAlign: "center"}} >  Counter Login </h1>
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
                            <Link to="/counter/register">To Register</Link> &nbsp;&nbsp;
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
export default CounterLoginScreen;