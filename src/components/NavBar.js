import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";

import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function NavBar() {
  const navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/")}>سطح ۱ home</Nav.Link>
              <Nav.Link onClick={() => navigate("/levels")}>سطح ها</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => navigate("/")}>
                  نمایش برای دانش آموز سطح ۱
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => navigate("/levels")}>
                  نمایش تمام سطوح
                </NavDropdown.Item>
              </NavDropdown>
              <Button variant="dark" onClick={signUserOut}>
                خروج از برنامه
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
