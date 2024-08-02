import { LinkContainer } from "react-router-bootstrap";
import Container from "react-bootstrap/Container";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./navbar.css";
import { useLocation } from "react-router-dom";

const NavbarFunc = ({ setBasePath }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const basePath = pathSegments[1];

  return (
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

            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
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
