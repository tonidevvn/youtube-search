import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ToogleModeColor from "../components/ToogleModeColor";
import { NavLink } from "react-router-dom";

function BsNavbar() {
  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink to="/" end className="navbar-brand">
          Youtube-Search
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto align-items-center">
            <NavLink to="/users" className="nav-link">
              Users
            </NavLink>
            <NavLink to="/about" className="nav-link">
              About
            </NavLink>
            <ToogleModeColor />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default BsNavbar;
