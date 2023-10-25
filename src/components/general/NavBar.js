import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";

import { signOut } from "firebase/auth";
import { auth } from "../../database/firebase";

export default function NavBar() {
  const navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth);
  };

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        style={{ fontSize: "32px" }}
      >
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/")}>سطح ۱</Nav.Link>
              <Nav.Link onClick={() => navigate("/level2")}>سطح ۲</Nav.Link>
              <NavDropdown title="منو" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={() => navigate("/")}>
                  نمایش برای دانش آموز سطح ۱
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => navigate("/level2")}>
                  نمایش تمام سطوح
                </NavDropdown.Item>
              </NavDropdown>
              <Button variant="dark" onClick={signUserOut}>
                خروج
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
