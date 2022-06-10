import React, { useState, useEffect } from 'react'
import axios from "axios";
import InputGroup from 'react-bootstrap/InputGroup'
import {useNavigate, useLocation } from 'react-router-dom'
import CounterNavbar from './counterNavbar';
import io from 'socket.io-client' 

const socket = io.connect("http://localhost:5000");

function CounterIssueScreen() {
  
  const location = useLocation();
  const [posts,setposts] =useState([])
  const [error,setError]=useState(null);
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
    .then(resposeCIS=>{
        console.log(resposeCIS)
        setposts(resposeCIS.data)
    }).catch(err=>{
        console.log(err)
    })},[])

    const done = (post) =>{
      axios.put(`http://localhost:5000/counter/deleteIssue/${post.id}`)
      .then(response=>{
          navigate('/counter/getall')

          window.location.reload()
      }).catch(error=>{
          setError("some thing is wrong");
      })
    }

    const doneAndNext = (post) =>{
      axios.get(`http://localhost:5000/counter/doneNext/${post.id}`)
        .then(response=>{
            navigate(`/counter/getone/${(post.id)+1}`,{state:{id:(post.id)+1}})

            socket.emit('send_Message',{ 
                message: 'Hello , Now your turn',
                issue_No:(post.issue_no)+1,
                counter_No:post.counter_id });

            window.location.reload();
            
        }).catch(error=>{
            setError("some thing is wrong");
        })
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
                className="border-0 text-white"
                style={{marginTop:"1%", marginLeft:'1%', backgroundColor:'#0d47a1', }}
                onClick={()=>{done(post)}}  />

            <input type="button"
                value={"Done and Next"} 
                className="border-0 text-white"
                style={{marginTop:"1%", marginLeft:'1%', backgroundColor:'#d50000', }}
                onClick={()=>{doneAndNext(post)}}  />

            </div>
        </>))}
    </div>
  )
}

export default CounterIssueScreen