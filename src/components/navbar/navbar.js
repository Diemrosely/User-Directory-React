import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import logo from '../../Logo.png'
import './navbar.css';

function AppNavbar() {
  return (
      //can only have one parent element
      <>
    <Navbar bg="white">
      <Navbar.Brand href="#home">
        <img
          src={logo}
          width="180"
          height="180"
          className="d-inline-block align-top"
          alt="Company logo"
        />
      </Navbar.Brand>
    </Navbar>
    <br />
    <Navbar className="nav" variant="light">
      <Navbar.Brand href="#home">
        Employee Directory
      </Navbar.Brand>
    </Navbar>
    </>
  );
}

export default AppNavbar;


