import React, { useState, useEffect } from 'react'
import axios from "axios";
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { Button, Nav, Col, FormControl, Row } from "react-bootstrap";
import {useNavigate, Link, useLocation } from 'react-router-dom'
import CounterNavbar from './counterNavbar';

function CounterIssueScreen() {
  
  const location = useLocation();
  const [posts,setposts] =useState([])
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false);
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
    axios.get(`http://localhost:5000/counter/getOne/${location.state.id}`)
      .then(respose=>{
        console.log(respose)
        setposts(respose.data)
      }).catch(err=>{
        console.log(err)
      })
      },[])

  const handleDoneNext = (id)=>{

      // setError(null);
      // setLoading(true);

      // axios.get(`http://localhost:5000/counter/doneNext/${id}`)
      // .then(response=>{
            
      // }).catch(error=>{
              
      // });
        
    }
      
    const handleDone = (id)=>{

        // setError(null);
        // setLoading(true);

        // axios.put(`http://localhost:5000/counter/deleteIssue/${id}`,
        // {  
          
        // }).then(response=>{
            
        // }).catch(error=>{
              
        // });
    }
  

  return (
    <div>
        <CounterNavbar/>
        {posts.map(post=>(<>
        <div 
            className="block-example border border-dark "
            style={{marginTop:"6%", marginLeft:'10%', marginRight:'10%' }}>
            <div >
              <InputGroup >
                <InputGroup.Text  
                    className='text-danger rounded-circle secondary bg-body'
                    style={{marginTop:"1%", marginLeft:'1%', fontSize:'30px'}}>
                        {post.issue_no}
                </InputGroup.Text>
                <InputGroup.Text  
                    className=" text-body border-0 bg-body"
                    style={{marginTop:"1%", marginLeft:'1%', fontSize:'30px'}}>
                        {post.name}
                </InputGroup.Text>
              </InputGroup>
              <InputGroup>
                <InputGroup.Text  
                    className=" border-0 text-primary bg-body"
                    style={{ marginLeft:'5%', fontSize:'15px'}}>
                        {post.tpno}
                </InputGroup.Text>
                <InputGroup >
                <InputGroup.Text  
                    className='text-body bg-body border-0'
                    style={{marginTop:"1%", marginLeft:'3%', fontSize:'30px'}}>
                        Issue 
                </InputGroup.Text>
              </InputGroup>
              <InputGroup>
                <InputGroup.Text  
                    className=" text-body border-0 bg-body"
                    style={{marginTop:"0%", marginLeft:'4%', fontSize:'20px'}}>
                        {post.issue}
                </InputGroup.Text>
              </InputGroup>
              </InputGroup>
            </div>
        </div>
        <div>
            <input type="button" 
                value={"Done"} 
                disabled={loading}
                className="border-0 text-white"
                style={{marginTop:"1%", marginLeft:'1%', backgroundColor:'#0d47a1', }}
                onClick={handleDone(post.id)}  />

            <input type="button"
                value={"Done and Next"} 
                disabled={loading}
                className="border-0 text-white"
                style={{marginTop:"1%", marginLeft:'1%', backgroundColor:'#d50000', }}
                onClick={handleDoneNext(post.id)}  />
            </div>
        </>))}
    </div>
  )
}

export default CounterIssueScreen