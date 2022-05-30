import React, { useState } from 'react'
import axios from "axios";
import Form from 'react-bootstrap/Form'
import { Button, Stack, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate, Link} from 'react-router-dom'
import UserNavbar from './userNavbar';

function NotificationScreen() {
  return (
    <div>
      < UserNavbar/>
      <h4 style={{marginTop:"5%", textAlign:"left", marginLeft:"10%"}}> Notification</h4>
    </div>
  )
}

export default NotificationScreen