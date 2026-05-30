import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { authService } from "../../Services/AuthService";

function AppNavbar() {
  const isAdmin = authService.isAuthenticated();

  return (
    <Navbar
      expand="lg"
      sticky="top"
      style={{ backgroundColor: "#FF9933"}}
    >
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" className="fw-bold text-dark">
          Veer Tejaji Samaj Seva Sansthan
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" className="text-dark">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" className="text-dark">
              About Us
            </Nav.Link>
            <Nav.Link as={NavLink} to="/activities" className="text-dark">
              Activities
            </Nav.Link>
            <Nav.Link as={NavLink} to="/committee" className="text-dark">
              Committee
            </Nav.Link>
            <Nav.Link as={NavLink} to="/gallery" className="text-dark">
              Gallery
            </Nav.Link>
            <Nav.Link as={NavLink} to="/donate" className="text-dark">
              Donate
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact" className="text-dark">
              Contact
            </Nav.Link>
            {isAdmin && (
              <Nav.Link as={NavLink} to="/admin/dashboard" className="text-dark fw-bold">
                Admin
              </Nav.Link>
            )}
            {!isAdmin && (
              <Nav.Link as={NavLink} to="/admin/login" className="text-dark">
                Admin Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
