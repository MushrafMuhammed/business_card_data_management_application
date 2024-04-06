import React, { useEffect } from 'react';
import {Navbar, Nav, Button, Container} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useNavigate } from "react-router";
function AppNavbar() { 
  const userData = sessionStorage.getItem("user");
  const navigate = useNavigate()
  useEffect(()=>{
    if (!userData){
      navigate("login")
    }
  },[userData])

  const logout=()=>{
    sessionStorage.clear();
    navigate("login")
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">Card Management</Navbar.Brand>
        {userData ? (
        <>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                  <NavLink to="/" className="nav-link">Card Upload</NavLink>
                  <NavLink to="/card-details" className="nav-link">Card details List</NavLink>
                  <Button variant="outline-success" onClick={logout}>Logout</Button>
            </Nav>
            </Navbar.Collapse>
        </>
        ) : ""}
        
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
