import { Container, Navbar, Nav } from "react-bootstrap";
import logo from '../assets/download.png'

function NavBar(){
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
                <Nav.Link>Home</Nav.Link>
                <Nav.Link>Cadastrar Pessoa</Nav.Link>
                <Nav.Link>Cadastrar Acesso</Nav.Link>
            </Nav>
        </Container>
      </Navbar>
    )
}

export default NavBar;