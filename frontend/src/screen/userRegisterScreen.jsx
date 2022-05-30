import React, { useState } from 'react'
import axios from "axios";
import Form from 'react-bootstrap/Form'
import { Button, Stack, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate, Link} from 'react-router-dom'


function UserRegisterScreen() {

    const [uname,setName] =useState('');
    const [uemail,setEmail] =useState('');
    const [upassword,setPassword]=useState('');
    const [utpno,setTpno]=useState('');
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(false);
    const navigater = useNavigate()

    const handleLogin =()=>
    {
        setError(null);
        setLoading(true);

        axios.post("http://localhost:5000/user/register",
        {  
            name:uname, 
            email:uemail, 
            password:upassword, 
            tpno:utpno
        }   
        ).then(response=>{
            setLoading(false);
        }).catch(error=>{
            setLoading(false);

        if(error.response.status === 400 || error.response.status === 401 || error.response.status === 409)
        {
            setError(error.response.data);
            setError("Please enter all the details");
        }
        else{
            setError("samthing is wrong");
        }
        });
        navigater('/user/login')
    }

  return (
    <div>
        <br/><br/><br/>
        <h1 style={{textAlign: "center"}} >User Register</h1>
        <br/><br/> 

        <Stack direction="horizontal" gap={5} className="d-flex justify-content-center">
            <Form as={Row}>
                <br/>{error && <div className="error" style={{marginTop:"-10px",color:"red"}} >{error}</div>}
                 <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Col sm={{ span: 9, offset: 1}}>
                        <Form.Control 
                                type="text" 
                                placeholder="Name" 
                                value={uname}
                                onChange={e=>setName(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Col sm={{ span: 9, offset: 1}}>
                            <Form.Control 
                                    type="email" 
                                    placeholder="User Name" 
                                    value={uemail}
                                    onChange={e=>setEmail(e.target.value)} />
                        </Col>
                    </Form.Group>
    
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Col sm={{ span: 9, offset: 1}}>
                        <Form.Control 
                                type="password" 
                                placeholder="Password" 
                                value={upassword}
                                onChange={e=>setPassword(e.target.value)} />
                    </Col>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Col sm={{ span: 9, offset: 1}}>
                        <Form.Control 
                                type="text" 
                                placeholder="Tp Number"  
                                value={utpno}
                                onChange={e=>setTpno(e.target.value)} />
                    </Col>
                </Form.Group>
      
                <Form.Group className="mb-3">
                    <Col sm={{ span:5, offset: 6}}>
                        <Link to="/user/login">To Sign in</Link> &nbsp;&nbsp;
                        <Button type="submit"
                                value={loading ?"Loading...": "Register"} 
                                disabled={loading}
                                onClick={handleLogin}>
                                    Register
                        </Button>
                    </Col>
                </Form.Group>
    
             </Form>
        </Stack>
    </div>
  )
}

export default UserRegisterScreen