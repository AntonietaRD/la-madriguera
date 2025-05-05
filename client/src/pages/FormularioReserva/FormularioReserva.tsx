import {
  Container,
  Button,
  Form,
  FormControl,
  InputGroup,
  Modal,
} from "react-bootstrap";
import DatosReserva from "./DatosReserva/DatosReserva.tsx";
import { useState } from "react";
import axios from "axios";
import config from "../../config.ts";
import { useMediaQuery } from "react-responsive";

function FormularioReserva() {
  const [show, setShow] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [folio, setFolio] = useState(""); // Estado para el folio

  const handleClose = () => {
    setShow(false);
    setShowResult(false);
  };

  const handleShow = () => setShow(true);

  const handleShowResult = (title: string, message: string) => {
    setShow(false); // Close the first modal
    setModalTitle(title);
    setModalMessage(message);
    setShowResult(true); // Open the result modal
  };

  const handleCancelReservation = async () => {
    try {
      const response = await axios.post(
        `${config.apiUrl}/reservas/modificar-estado-reserva`,
        { reservaId: folio, nuevoEstado: "cancelada" },
      );

      if (response.status === 200) {
        handleShowResult(
          "Cancelación exitosa",
          "Se canceló tu reservación adecuadamente",
        );
        setFolio("");
      } else {
        handleShowResult(
          "Error en la cancelación",
          "Hubo un problema al cancelar tu reservación. Por favor, intenta nuevamente.",
        );
      }
    } catch (error) {
      handleShowResult(
        "Error en la cancelación",
        "Hubo un problema al cancelar tu reservación. Por favor, intenta nuevamente.",
      );
    }
  };

  // Use useMediaQuery to detect screen size
  const isMobile = useMediaQuery({ maxWidth: 780 });

  return (
    <Container className={isMobile ? "w-100 my-4" : "w-50"}>
      <h1 className={`${isMobile ? "display-4" : "display-2"} text-center`}>
        🗓️ Reserva la Madriguera
      </h1>
      <Form className="w-100 d-flex flex-column justify-content-start align-items-center gap-5">
        {/* Apartado para ingresar folio */}
        <InputGroup className={`mb-3 ${isMobile ? "w-100" : "w-75"}`}>
          <Form.Label>
            Si usted ya cuenta con una reserva y desea modificarla o cancelarla,
            ingrese a continuación el folio de su reserva
          </Form.Label>
          <FormControl
            aria-label="Número de folio"
            aria-describedby="basic-addon2"
            value={folio}
            onChange={(e) => setFolio(e.target.value)}
          />
          <Button
            variant="primary"
            id="button-addon2"
            onClick={handleShow}
          >
            Modificar o Cancelar Reserva
          </Button>
        </InputGroup>

        {/* Componente de datos de reserva */}
        <DatosReserva />
      </Form>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Advertencia</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Seguro de que quieres cancelar tu solicitud de reserva?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            NO
          </Button>
          <Button variant="primary" onClick={handleCancelReservation}>
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
    </Container>
  );
}

export default FormularioReserva;
