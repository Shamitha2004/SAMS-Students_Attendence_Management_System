import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import loggingout from '../Assets/logout.png'
import { useNavigate } from 'react-router-dom';

export default function Header({logout}) {
  const navigate=useNavigate();

const handlelogout=()=>{
    logout();
    navigate('/')
  }
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
    <Container>
      <Navbar.Brand onClick={handlelogout}>
      <img
            src={loggingout}
            alt="Logo"
            width="30"
            height="auto"
            className="d-inline-block align-top"
           
          />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Go to Login</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
