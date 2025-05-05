import { Row, Container, Col, Button, Form, Toast } from "react-bootstrap";
import { ChangeEvent, useState } from "react";
import DateCalendar from "./DateCalendar.tsx";
import axios from "axios";
import config from "../../config.ts";

type TournamentData = {
  nombre: string | undefined;
  categoria: string | undefined;
  descripcion: string | undefined;
  fechaInicio: Date | undefined;
  fechaFin: Date | undefined;
  modalidad: string | undefined;
};

function NuevoTorneo() {
  const [validated, setValidated] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [tournamentData, setTournamentData] = useState<TournamentData>({
    nombre: undefined,
    categoria: undefined,
    descripcion: undefined,
    fechaInicio: undefined,
    fechaFin: undefined,
    modalidad: undefined,
  });

  const handleClose = () => setShowToast(false);

  async function uploadServer(tournamentData) {
    try {
      console.log("Uploading to server...");
      await axios.post(`${config.apiUrl}/torneos/publicar`, tournamentData, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });
      onSuccessSubmit();
    } catch (error) {
      console.error("Error uploading data:", error);
      onFailSubmit();
    }
  }

  function onSuccessSubmit() {
    setShowToast(true);
    setToastText("Torneo creado con éxito");
    setValidated(false);
  }

  function onFailSubmit() {
    setShowToast(true);
    setToastText("Error en la publicación del torneo. Intentelo de nuevo");
    setValidated(false);
  }

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setTournamentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    const categoria = form.elements["categoria"];
    if (categoria.value === "Seleccionar") {
      categoria.setCustomValidity("Por favor, seleccione una categoría");
    } else {
      categoria.setCustomValidity("");
    }

    const modalidad = form.elements["modalidad"];
    if (modalidad.value === "Seleccionar") {
      modalidad.setCustomValidity("Por favor, seleccione una modalidad");
    } else {
      modalidad.setCustomValidity("");
    }

    const fechaInicio = form.elements["fechaInicio"];
    const fechaFin = form.elements["fechaFin"];
    const fechaInicioSeleccionada = new Date(fechaInicio.value);
    const fechaFinSeleccionada = new Date(fechaFin.value);
    const fechaActual = new Date();

    if (fechaInicioSeleccionada < fechaActual) {
      fechaInicio.setCustomValidity("Por favor, seleccione una fecha futura");
    } else {
      fechaInicio.setCustomValidity("");
    }

    if (fechaFinSeleccionada < fechaInicioSeleccionada) {
      fechaFin.setCustomValidity(
        "La fecha de fin debe ser posterior a la fecha de inicio",
      );
    } else {
      fechaFin.setCustomValidity("");
    }

    setValidated(true);

    if (form.checkValidity()) {
      await uploadServer(tournamentData);
    }
    console.log("Submission attempted");
  };

  return (
    <Container
      className={
        "d-flex flex-column gap-5 justify-content-center align-items-center"
      }
    >
      <Row className="mt-5">
        <h2>Creación de torneos </h2>
      </Row>
      <Form
        style={{
          width: "50%",
          fontFamily: "Inter, sans-serif",
          fontOpticalSizing: "auto",
          fontWeight: "400",
          fontStyle: "normal",
          fontVariationSettings: "slnt 0",
        }}
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Row className="mb-3">
          <Form.Group as={Col} controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              style={{
                fontFamily: "Inter, sans-serif",
                fontOpticalSizing: "auto",
                fontWeight: "200",
                fontStyle: "normal",
                fontVariationSettings: "slnt 0",
                border: "none",
                boxShadow: "0 4px 8px rgba(117, 117, 117, 0.2)",
              }}
              required
              type="text"
              placeholder="Nombre de torneo"
              pattern="[A-Za-z\s]+"
              name="nombre"
              onChange={handleInputChange}
            />
            <Form.Control.Feedback
              type="invalid"
              style={{
                fontFamily: "Inter, sans-serif",
                fontOpticalSizing: "auto",
                fontWeight: "200",
                fontStyle: "normal",
                fontVariationSettings: "slnt 0",
              }}
            >
              Por favor, ingrese solo letras y espacios
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="categoria">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              style={{
                fontFamily: "Inter, sans-serif",
                fontOpticalSizing: "auto",
                fontWeight: "200",
                fontStyle: "normal",
                fontVariationSettings: "slnt 0",
                border: "none",
                boxShadow: "0 4px 8px rgba(117, 117, 117, 0.2)",
              }}
              defaultValue="Seleccionar"
              required
              name="categoria"
              onChange={handleInputChange}
            >
              <option disabled hidden>
                Seleccionar
              </option>
              <option>Mixta</option>
              <option>Femenil</option>
              <option>Varonil</option>
            </Form.Select>
            <Form.Control.Feedback
              type="invalid"
              style={{
                fontFamily: "Inter, sans-serif",
                fontOpticalSizing: "auto",
                fontWeight: "200",
                fontStyle: "normal",
                fontVariationSettings: "slnt 0",
              }}
            >
              Por favor, seleccione una categoría
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="descripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            style={{
              fontFamily: "Inter, sans-serif",
              fontOpticalSizing: "auto",
              fontWeight: "200",
              fontStyle: "normal",
              fontVariationSettings: "slnt 0",
              border: "none",
              boxShadow: "0 4px 8px rgba(117, 117, 117, 0.2)",
            }}
            as="textarea"
            rows={3}
            placeholder="Escriba aquí su descripción..."
            name="descripcion"
            required
            maxLength={200}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback
            type="invalid"
            style={{
              fontFamily: "Inter, sans-serif",
              fontOpticalSizing: "auto",
              fontWeight: "200",
              fontStyle: "normal",
              fontVariationSettings: "slnt 0",
            }}
          >
            Por favor, escriba una descripción
          </Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Form.Group as={Col} className="mb-3" controlId="fechaInicio">
            <Form.Label>Fecha inicio</Form.Label>
            <DateCalendar
              name="fechaInicio"
              onChange={handleInputChange}
            ></DateCalendar>
            <Form.Control.Feedback
              type="invalid"
              style={{
                fontFamily: "Inter, sans-serif",
                fontOpticalSizing: "auto",
                fontWeight: "200",
                fontStyle: "normal",
                fontVariationSettings: "slnt 0",
              }}
            >
              Por favor, seleccione una fecha futura
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} className="mb-3" controlId="fechaFin">
            <Form.Label>Fecha fin</Form.Label>
            <DateCalendar
              name="fechaFin"
              onChange={handleInputChange}
            ></DateCalendar>
            <Form.Control.Feedback
              type="invalid"
              style={{
                fontFamily: "Inter, sans-serif",
                fontOpticalSizing: "auto",
                fontWeight: "200",
                fontStyle: "normal",
                fontVariationSettings: "slnt 0",
              }}
            >
              La fecha de fin debe ser posterior a la fecha de inicio
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group as={Col} controlId="modalidad">
            <Form.Label>Modalidad de juego</Form.Label>
            <Form.Select
              style={{
                fontFamily: "Inter, sans-serif",
                fontOpticalSizing: "auto",
                fontWeight: "200",
                fontStyle: "normal",
                fontVariationSettings: "slnt 0",
                border: "none",
                boxShadow: "0 4px 8px rgba(117, 117, 117, 0.2)",
              }}
              defaultValue="Seleccionar"
              required
              name="modalidad"
              onChange={handleInputChange}
            >
              <option disabled hidden>
                Seleccionar
              </option>
              <option>Fútbol 5</option>
              <option>Fútbol 7</option>
              <option>Fútbol 11</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              Por favor, seleccione una modalidad de juego
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        {showToast && (
          <Toast onClose={handleClose}>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
            </Toast.Header>
            <Toast.Body>{toastText}</Toast.Body>
          </Toast>
        )}

        <br></br>
        <Button
          className="mb-5 mt-4"
          variant="primary"
          type="submit"
          style={{
            width: "20vw",
            height: "10vh",
            fontFamily: "Inter , sans-serif",
            fontWeight: "400",
            fontSize: "1.2em",
            boxShadow: "0 4px 8px rgba(117, 117, 117, 0.2)",
          }}
        >
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default NuevoTorneo;
