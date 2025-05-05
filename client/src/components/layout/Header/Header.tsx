import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import config from "../../../config.ts";

function Header() {

  return (
    <header className="sticky-top">
      <Navbar bg="primary" data-bs-theme="light" expand="lg">
        <Container className={"flex-row gap-5"}>
          <Navbar.Brand as={Link} to="/">
            <img
              alt=""
              src={`${config.baseUrl}/madriguera-logo-azul.png`}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            La Madriguera
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto flex-row gap-3">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/ligas">
                Ligas
              </Nav.Link>
              <Nav.Link as={Link} to="/estadisticas">
                Estadísticas
              </Nav.Link>
              <Nav.Link as={Link} to="/reservaciones">
                Reserva nuestra cancha
              </Nav.Link>
              <Nav.Link as={Link} to="/galeria">
                Galería de fotos
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Button variant="danger" onClick={() => {
            window.location.href = config.adminUrl
          }}>¿Eres administrador?</Button>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
