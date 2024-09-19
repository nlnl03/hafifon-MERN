import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
import React, { useState, useContext } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./navbar.css";
import { useLocation } from "react-router-dom";
import {
  DataProvider,
  DataContext,
} from "../../handleDataChange/context&provider";

const NavbarFunc = ({ setBasePath }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const basePath = pathSegments[1];
  const { data, postData } = useContext(DataContext);

  const endpoints = {
    examsAndTests: "/api/examsAndTests",
  };

  return (
    <DataProvider endpoints={endpoints}>
      <Navbar expand="lg" className="body-tertiary main-navbar" dir="rtl">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>חפיפה</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to={`/${basePath}/studyMeterials`}>
                <Nav.Link>חומרי לימוד</Nav.Link>
              </LinkContainer>

              <NavDropdown title="בחנים ומבחנים" id="basic-nav-dropdown">
                {data}
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
    </DataProvider>
  );
};

export default NavbarFunc;
