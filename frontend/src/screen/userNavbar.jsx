import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav } from "react-bootstrap";
import {Link} from 'react-router-dom'
import { MdNotifications } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";

function UserNavbar() {
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
                               User <BsPersonCircle/>
                        </Link>&nbsp;&nbsp;
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default UserNavbar