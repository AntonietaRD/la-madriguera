import { useState, useEffect } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import axios from "axios";
import config from "../../config.ts";
import { useNavigate } from "react-router-dom";
import { CSSProperties } from "react";
import styles from "./VerLigas.module.css";
import {fetchDatos} from "../../utils/utils.ts";

type Liga = {
  id_liga: number;
  nombre: string;
  descripcion: string;
  genero: string;
  tipo: string;
};

function VerLigas() {
  const [ligas, setLigas] = useState<Liga[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLigas = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/ligas/obtener-info-ligas`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          },
        );
        console.log(response);
        setLigas(response.data.data);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    fetchLigas();
  }, []);

  const cardStyle: CSSProperties = {
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
    fontSize: "1.1em",
    maxWidth: "90%",
    maxHeight: "40%",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 4px 8px rgba(117, 117, 117, 0.2)",
    color: "#4264a8",
    border: "none",
  };

  const cardBodyStyle: CSSProperties = {
    flex: "1",
  };

  return (
    <Container>
      <Row>
        <h2 className="my-5 text-center">Ligas</h2>
      </Row>
      <Row className="ligas d-flex justify-content-center align-items-start ">
        {ligas.map((liga) => (
          <Col
            key={liga.id_liga}
            xs={12}
            sm={12}
            md={12}
            lg={4}
            className="mb-4 d-flex justify-content-center mb-5"
          >
            <div className="card" style={cardStyle}>
              <img
                src="src/assets/madriguera-logo-azul.png"
                className="card-img-top "
                alt={liga.nombre}
              />
              <div className="h-auto card-body shadow rounded-3">
                <h5 className="card-title">{liga.nombre}</h5>
                <p className="card-text">{liga.descripcion}</p>
                <ul className="list-group">
                  <li className="list-group-item">Categoría: {liga.genero}</li>
                  <li className="list-group-item">Modalidad: {liga.tipo}</li>
                </ul>
                <div className="d-flex flex-column justify-content-center align-items-center gap-3 mt-3">
                  <Button
                    className={`${styles.btn}`}
                    variant="primary"
                    type="submit"
                    onClick={() => {
                      navigate(`/ligas/${liga.id_liga}/equipos`);
                    }}
                  >
                    Equipos registrados
                  </Button>
                  <Button
                    className={styles.btn}
                    variant="primary"
                    type="submit"
                    onClick={() => {
                      navigate(`/ligas/partidos/${liga.id_liga}`);
                    }}
                  >
                    Partidos
                  </Button>
                  <Button
                    className={styles.btn}
                    variant="primary"
                    type="submit"
                    onClick={() => {
                      fetchDatos('descargar-tabla-liga', `datos_tabla_${liga.nombre}`)
                    }}
                  >
                    Descargar tabla de liga
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default VerLigas;
