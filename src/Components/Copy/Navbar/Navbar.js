import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation } from "react-router-dom";

function NavBar() {
  const [colorChange, setColorchange] = useState(false);
  const changeNavbarColor = () => {
    if (window.scrollY >= 200) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  const location = useLocation();

  window.addEventListener("scroll", changeNavbarColor);
  const isHomePage = location.pathname === "/";

  return (
    <Navbar
      className={colorChange && !isHomePage ? "navbar colorChange" : "navbar"}
      expand="lg"
      fixed="top"
      style={{ backgroundColor: colorChange ? "#FFF" :"#FFFFFF01" }}
    >
      <Container>
        <Link to="/">
          <Navbar.Brand>
            <img
              alt=""
              src={`${process.env.PUBLIC_URL}/assets/logo/7ac1037e455cb7559800318b98569c40.png`}
              width="100"
              height="100"
              flex-shrink="0"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link className="menu-itm1" href="/">
              Home
            </Nav.Link>
            <NavDropdown
              className="menu-itm"
              title="Courses"
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item href="/cuetugcource">
                CUET UG Course
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              className="menu-itm"
              title="Mock Tests"
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item>Mock Tests</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className="menu-itm" href="/subscription">
              Subscription
            </Nav.Link>
          </Nav>
          <Nav.Link
            className="menu-itm1"
            href="/signup"
            style={{
              border: "1px solid #71269C",
              color: "#7B1FA2",
              borderRadius: "4px",
              boxSizing: "border-box",
              padding: "15px 20px",
              backgroundColor: "white",
              width: "18%",
              gap: "8px",
            }}
          >
            Sign in / sign up
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
