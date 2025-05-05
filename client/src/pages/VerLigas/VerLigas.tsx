import { useState, useEffect } from "react";
import { Button, Row, FormControl, Modal, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../../config.ts";
import { CSSProperties } from "react";
import styles from "./VerLigas.module.css";

type Liga = {
  id_liga: number;
  nombre: string;
  descripcion: string;
  genero: string;
  tipo: string;
};

const cardStyle: CSSProperties = {
  fontFamily: "Inter, sans-serif",
  fontWeight: "400",
  fontSize: "1.1em",
  maxWidth: "90%",
  maxHeight: "40%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 4px 8px rgba(117, 117, 117, 0.2)",
  color: "#4264a8",
  border: "none",
};

const cardBodyStyle: CSSProperties = {
  flex: "1",
};

function VerLigas() {
  const [ligas, setLigas] = useState<Liga[]>([]);
  const [folioEquipo, setFolioEquipo] = useState(""); // State to hold the team folio
  const [folioIndividual, setFolioIndividual] = useState(""); // State to hold the individual folio
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [cancelType, setCancelType] = useState(""); // State to hold the cancel type (team or individual)

  const handleClose = () => {
    setShow(false);
    setShowResult(false);
  };

  const handleShow = (type: "team" | "individual") => {
    setCancelType(type);
    setShow(true);
  };

  const handleShowResult = (title: string, message: string) => {
    setShow(false); // Close the first modal
    setModalTitle(title);
    setModalMessage(message);
    setShowResult(true); // Open the result modal
  };

  const handleCancelInscription = async () => {
    const url =
      cancelType === "team"
        ? `${config.apiUrl}/ligas/cancelar-inscripcion-equipo`
        : `${config.apiUrl}/ligas/cancelar-inscripcion-individual`;

    const folio = cancelType === "team" ? folioEquipo : folioIndividual;

    try {
      await axios.post(
        url,
        { id: folio },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        },
      );

      handleShowResult(
        "Cancelación exitosa",
        "Se canceló tu inscripción adecuadamente",
      );

      if (cancelType === "team") {
        setFolioEquipo("");
      } else {
        setFolioIndividual("");
      }
    } catch (error) {
      console.error("Error de cancelación:", error);
      handleShowResult(
        "Error en la cancelación",
        "Hubo un problema al cancelar tu inscripción. Por favor, intenta nuevamente.",
      );
    }
  };

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
        setLigas(response.data.data);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    fetchLigas();
  }, []);

  return (
    <section className="d-flex flex-column justify-content-start gap-5 align-items-center">
      <h1>⚽️ Ligas</h1>
      <Row className="w-50">
        <h4 style={{ fontSize: "1.2em" }}>
          Si usted ya cuenta con una inscripción y desea cancelarla, ingrese a
          continuación el folio de su inscripción
        </h4>
        <Col>
          <h4 style={{ fontSize: "1.2em", fontWeight: "500" }} className="my-4">
            Cancelación de equipo
          </h4>
          <FormControl
            className="my-1"
            style={{
              maxWidth: "100%",
              fontFamily: "Inter, sans-serif",
              fontOpticalSizing: "auto",
              fontWeight: "200",
              fontStyle: "normal",
              fontVariationSettings: "slnt 0",
              border: "none",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(117, 117, 117, 0.2)",
            }}
            aria-label="Folio de inscripción"
            aria-describedby="button-addon2"
            placeholder="Escriba aquí su número de folio..."
            value={folioEquipo}
            onChange={(e) => setFolioEquipo(e.target.value)}
          />
          <div className="d-flex justify-content-center w-100">
            <Button
              className={`my-5 w-50 justify-content-start gap-5 align-items-center ${styles.button}`}
              variant="primary"
              id="button-addon2"
              onClick={() => handleShow("team")}
            >
              Cancelar Inscripción
            </Button>
          </div>
        </Col>
        <Col>
          <h4 style={{ fontSize: "1.2em", fontWeight: "500" }} className="my-4">
            Cancelación individual
          </h4>
          <FormControl
            className="my-1"
            style={{
              maxWidth: "100%",
              fontFamily: "Inter, sans-serif",
              fontOpticalSizing: "auto",
              fontWeight: "200",
              fontStyle: "normal",
              fontVariationSettings: "slnt 0",
              border: "none",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(117, 117, 117, 0.2)",
            }}
            aria-label="Folio de inscripción"
            aria-describedby="button-addon2"
            placeholder="Escriba aquí su número de folio..."
            value={folioIndividual}
            onChange={(e) => setFolioIndividual(e.target.value)}
          />
          <div className="d-flex justify-content-center w-100">
            <Button
              className={`my-5 w-50 justify-content-start gap-5 align-items-center ${styles.button}`}
              variant="primary"
              id="button-addon2"
              onClick={() => handleShow("individual")}
            >
              Cancelar Inscripción
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="w-75 d-flex justify-content-center align-items-center ">
        {ligas.map((liga) => (
          <Col
            key={liga.id_liga}
            xs={6}
            sm={6}
            md={6}
            lg={3}
            className="mb-4 d-flex justify-content-center mb-5"
          >
            <div className="card" style={cardStyle}>
              <img
                src={`${config.baseUrl}/madriguera-logo-azul.png`}
                className="card-img-top mt-4"
                alt={liga.nombre}
                style={{ width: "50%" }}
              />
              <div className="h-auto card-body" style={cardBodyStyle}>
                <h6
                  className="card-title my-3"
                  style={{
                    fontSize: "1.8em",
                    fontFamily: "Anton, sans-serif",
                    textShadow: "1px 2px 2px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {liga.nombre}
                </h6>
                <p className="card-text">{liga.descripcion}</p>
                <ul className="list-group">
                  <li className="list-group-item">Categoría: {liga.genero}</li>
                  <li className="list-group-item">Modalidad: {liga.tipo}</li>
                </ul>
                <div
                  className={
                    "my-3 d-flex justify-content-center align-items-center flex-column gap-3"
                  }
                >
                  <Button
                    className={`${styles.button}`}
                    variant="primary"
                    type="submit"
                    onClick={() => {
                      navigate(`/ligas/inscripcion/${liga.id_liga}`);
                    }}
                  >
                    Inscribirse
                  </Button>
                  <Button
                    className={`${styles.button}`}
                    variant="primary"
                    onClick={() => {
                      navigate(`/estadisticas/${liga.id_liga}/${liga.nombre}`);
                    }}
                  >
                    Ver tabla de liga
                  </Button>
                  <Button
                    className={`${styles.button}`}
                    variant="primary"
                    onClick={() => {
                      navigate(`/ligas/partidos/${liga.id_liga}"`);
                    }}
                  >
                    Ver partidos
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
      {/* Elemento para confirmación de cancelar inscripción */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Advertencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Seguro de que quieres cancelar tu inscripción a este torneo?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            NO
          </Button>
          <Button variant="primary" onClick={handleCancelInscription}>
            SÍ
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Elemento para indicar exito de cancelación de inscripción */}
      <Modal show={showResult} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default VerLigas;
