import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav } from "react-bootstrap";
import {Link} from 'react-router-dom'
import { BsPersonFill } from "react-icons/bs";

function HomeScreen() {
  return (
    <div >
        <Navbar collapseOnSelect expand="lg" bg="light">
            <Container> 
                <Navbar.Collapse className="justify-content-end">
                    <Nav >
                        <Link 
                            className="btn btn-info text-light" 
                            to="/counter/login"
                            style={{marginTop:"10px"}}> 
                               <BsPersonFill/> Counter Login 
                        </Link>&nbsp;&nbsp;
                        <Link 
                            className="btn btn-info text-light " 
                            to="/user/login"
                            style={{marginTop:"10px"}}>    
                               <BsPersonFill/> User Login 
                        </Link>&nbsp;&nbsp;
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <h1 className='text-center text-success'>Welcome to Our Company</h1>

    </div>
  )
}

export default HomeScreen