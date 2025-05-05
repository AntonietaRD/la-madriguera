import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";

function Header() {
	const navigate = useNavigate();

	return (
		<header className="sticky-top">
			<Navbar bg="primary" data-bs-theme="light">
				<Container className={"flex-row gap-5 justify-content-between"}>
					<Navbar.Brand as={Link} to="/">
						<img
							alt=""
							src="src/assets/madriguera-logo-azul.png"
							width="30"
							height="30"
							className="d-inline-block align-top"
						/>{" "}
						La Madriguera <sub className={"text"}>Administrador</sub>
					</Navbar.Brand>
					<Nav className="me-auto flex-row gap-3">
						<Nav.Link as={Link} to="/">Inicio</Nav.Link>
						<Nav.Link as={Link} to="/ligas">Ligas</Nav.Link>
						<Nav.Link as={Link} to="/registrar-marcador">Registrar partido</Nav.Link>
						<Nav.Link as={Link} to="/reservas">Reservas de cancha</Nav.Link>
						<Nav.Link as={Link} to="/descargar-datos">Descargar datos</Nav.Link>
					</Nav>
					<Button variant={"danger"} onClick={() => {
						navigate('/logout')
					}}>Cerrar sesión</Button>
				</Container>
			</Navbar>
		</header>
	);
}

export default Header;
