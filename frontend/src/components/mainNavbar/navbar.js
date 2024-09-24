import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";
// import React, { useState, useContext } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import mainIcon from "../../assets/icon4.svg";
// import {
//   DataProvider,
//   DataContext,
// } from "../../handleDataChange/context&provider";

import RegisterForm from "../loginAndRegister/register";
import SignInForm from "../loginAndRegister/login";
import { useEffect, useState } from "react";

const NavbarFunc = ({ setBasePath }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const basePath = pathSegments[1];
  // const { data, postData } = useContext(DataContext);
  const [showRegister, setShowRegister] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  //Authenticate
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear("token");
    setIsAuthenticated(false);
    setUserName("");
    navigate(`/${basePath}/UserPage`); // Redirect to the main page after logout
  };

  return (
    <>
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

          {!isAuthenticated ? (
            <div className="loginRegister">
              <div>
                <button onClick={() => setShowSignIn(true)} id="userLogin">
                  התחברות
                </button>
              </div>
              <div>
                <button id="userRegister" onClick={() => setShowRegister(true)}>
                  הרשמה
                </button>
              </div>
            </div>
          ) : (
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <LinkContainer to={`/${basePath}/studyMaterials`}>
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

                <div className="logged-in-dropdown">
                  <NavDropdown title="{userName}" id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>האיזור האישי</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/settings">
                      <NavDropdown.Item>Settings</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      התנתק
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              </Nav>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
      <div className="bg"></div>
      <div>
        <RegisterForm
          show={showRegister}
          handleClose={() => setShowRegister(false)}
        />
        <SignInForm
          show={showSignIn}
          handleClose={() => setShowSignIn(false)}
          basePath={basePath}
        />
      </div>
    </>
  );
};

export default NavbarFunc;
