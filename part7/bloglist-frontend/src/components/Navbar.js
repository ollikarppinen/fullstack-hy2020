import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

import LogoutForm from "./LogoutForm";

const NavigationBar = () => {
  return (
    <Navbar>
      <Navbar.Brand href="#home">Blogs App</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link>
          <Link to={`/blogs`}>blogs</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to={`/users`}>users</Link>
        </Nav.Link>
      </Nav>
      <LogoutForm />
    </Navbar>
  );
};

export default NavigationBar;
