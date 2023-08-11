import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import auth from '../utils/auth';

function Navigation({ handlePageChange, handleMainChange }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#home">Costify</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              href="#main"
              onClick={() => handleMainChange()}
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              href="#signup"
              onClick={() => handlePageChange('Signup')}
            >
              Signup
            </Nav.Link>
            <Nav.Link
              href="#signup"
              onClick={() => handlePageChange('Login')}
            >
              Login
            </Nav.Link>
            <Nav.Link
              onClick={() => auth.logout()}
            >
              Logout
            </Nav.Link>
            <Nav.Link
              href="#link"
              onClick={() => handlePageChange('Expense')}
            >
              Add expense
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;