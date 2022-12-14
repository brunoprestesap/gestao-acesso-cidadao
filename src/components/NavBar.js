import { Container, Navbar, Nav, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/concierge-32330_960_720.png';
function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{' '}
          GateControl
        </Navbar.Brand>
        <Nav className="me-auto">
          <Stack direction="horizontal" gap={4}>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/novousuario">Cadastrar Cidadão</Nav.Link>

          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBar;
