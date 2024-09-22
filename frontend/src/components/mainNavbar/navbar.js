import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
// import React, { useState, useContext } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./navbar.css";
import { useLocation } from "react-router-dom";
import mainIcon from "../../assets/icon4.svg";
// import {
//   DataProvider,
//   DataContext,
// } from "../../handleDataChange/context&provider";

const NavbarFunc = ({ setBasePath }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const basePath = pathSegments[1];
  // const { data, postData } = useContext(DataContext);

  return (
    <Navbar expand="lg" className="body-tertiary main-navbar" dir="rtl">
      <Container>
        <LinkContainer to="/" className="brand">
          <Navbar.Brand className="web-name">
            <img src={mainIcon} alt="חפיפה" />
            <h2
              className="brand-name"
              style={{
                marginRight: ".3em",
                fontWeight: 600,
              }}
            >
              𝗡𝗲𝘁𝗠𝗮𝘀𝘁𝗲𝗿𝘆
            </h2>
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <LinkContainer to={`/${basePath}/studyMeterials`}>
              <Nav.Link>חומרי לימוד</Nav.Link>
            </LinkContainer>

            <NavDropdown title="בחנים ומבחנים" id="basic-nav-dropdown">
              {/* {data} */}
              <LinkContainer to="/option1">
                <NavDropdown.Item>Option 1</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/option2">
                <NavDropdown.Item>Option 2</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/option3">
                <NavDropdown.Item>Option 3</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>

            <LinkContainer to={`/${basePath}/home`}>
              <Nav.Link>ממשק מנהלים</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarFunc;
