import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav } from "react-bootstrap";
import {Link} from 'react-router-dom'
import { MdNotifications } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";


function CounterNavbar() {
  return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="light">
            <Container> 
                <Navbar.Collapse className="justify-right-end">
                    <Nav>
                        <h5 
                            className="text-secondary"
                            style={{marginTop:"10px"}}>    
                               Counter :
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
                               User <BsPersonCircle/>
                        </Link>&nbsp;&nbsp;
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default CounterNavbar