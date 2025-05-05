import React from "react";
import { Container, Row, Col, Button, Carousel } from "react-bootstrap";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import config from "../../config.ts";

function Home() {
  const navigate = useNavigate();

  return (
    <Container className="app-container m-0 d-flex flex-column gap-5 home-container">
      <Row>
        <Col>
          <Container className="container1 m-0 d-flex flex-column gap-5 my-5">
            <Row>
              <Col>
                <img className="logo" src={`${config.baseUrl}/Logo.png`} />
                <h1>Conoce La Madriguera</h1>
                <div className="rounded-square">
                  {
                    <h4>
                      Nuestro objetivo es ayudar a las personas con ceguera en
                      Puebla y tú puedes ser parte del cambio...
                    </h4>
                  }
                </div>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container className="content-container my-5">
            <Row>
              <div className="custom-carousel-container  ">
                <Carousel fade className="custom-carousel" controls indicators>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={`${config.baseUrl}/cancha_home.jpg`}
                      alt="slide 2"
                    />
                    <Carousel.Caption className="d-none d-md-block">
                      <Button
                        variant="primary"
                        className="boton1 my-3"
                        onClick={() => {
                          navigate("/reservaciones");
                        }}
                      >
                        <h4>Reserva aquí</h4>
                      </Button>
                      <h6 style={{ fontFamily: "Anton, sans-serif" }}>
                        Haz tus evento con nosotros
                      </h6>
                      <p className="p-home">
                        Reserva nuestra cancha La Madriguera para tus fiestas,
                        cascaritas y reuniones con amigos
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={`${config.baseUrl}/juego2_home.jpg`}
                      alt="slide 2"
                    />
                    <Carousel.Caption className="d-none d-md-block">
                      <Button
                        variant="primary"
                        className="boton1 my-3"
                        onClick={() => {
                          navigate("/ligas");
                        }}
                      >
                        <h4>Inscríbete aquí</h4>
                      </Button>
                      <h6 style={{ fontFamily: "Anton, sans-serif" }}>
                        Incríbete a nuestros torneos
                      </h6>
                      <p className="p-home">
                        Forma tu equipo de fútbol y juega en nuestra cancha La
                        Madriguera
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="d-block w-100"
                      src={`${config.baseUrl}/juego1_home.jpg`}
                      alt="slide 3"
                    />
                    <Carousel.Caption className="d-none d-md-block">
                      <Button
                        variant="primary"
                        className="boton1 my-3"
                        onClick={() => {
                          navigate("/estadisticas");
                        }}
                      >
                        <h4>Ver estadísticas</h4>
                      </Button>
                      <h6 style={{ fontFamily: "Anton, sans-serif" }}>
                        Conoce los resultados de los torneos
                      </h6>
                      <p className="p-home">
                        Explora todos los detalles de nuestras ligas{" "}
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
