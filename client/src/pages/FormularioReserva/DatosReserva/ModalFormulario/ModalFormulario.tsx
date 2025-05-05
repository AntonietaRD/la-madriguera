import React, { FormEvent, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatosUsuario from "../../DatosUsuario/DatosUsuario.tsx";
import axios from "axios";
import config from "../../../../config.ts";
import styles from "./ModalFormulario.module.css";
import { ReservaData } from "../../../../types/types.ts";

type EventType = {
  id_tipo_evento: number;
  nombre: string;
};

type ModalFormularioProps = {
  show: boolean;
  handleClose: () => void;
  date: string;
  startTime: string;
  endTime: string;
  reservaData: ReservaData;
  handleInputChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;
};

const ModalFormulario = ({
  show,
  handleClose,
  date,
  startTime,
  endTime,
  reservaData,
  handleInputChange,
}: ModalFormularioProps) => {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [validated, setValidated] = useState(false);
  const [idReserva, setIdReserva] = useState<number | null>(null);

  const handleSendRequest = async (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      try {
        console.log(reservaData);
        const response = await axios.post(
          `${config.apiUrl}/reservas/crear-solicitud-reserva`,
          reservaData,
        );
        setIdReserva(response.data.data);
        setShowSuccess(true); // Open the success modal
        console.log(response);
      } catch (err) {
        console.error(err);
      }
      handleClose(); // Close the first modal after form validation
    }
    setValidated(true); // Set validated to true to trigger Bootstrap's validation feedback
  };

  const handleCloseSuccess = () => setShowSuccess(false);

  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/reservas/obtener-tipos-evento`,
        );
        setEventTypes(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEventTypes();
  }, []);

  return (
    <section>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Reserva de cancha</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <p className={styles.datosReserva}>
              <strong>Día de tu reservación:</strong> {date}
            </p>
            <p className={styles.datosReserva}>
              <strong>Hora de inicio:</strong> {startTime}
            </p>
            <p className={styles.datosReserva}>
              <strong>Hora de fin:</strong> {endTime}
            </p>
          </div>
          <Form noValidate validated={validated} onSubmit={handleSendRequest}>
            <DatosUsuario
              reservaData={reservaData}
              handleInputChange={handleInputChange}
            />
            <Form.Group controlId="tipoEvento">
              <Form.Label className="text-start">Tipo de Evento</Form.Label>
              <Form.Select
                aria-label="Selecciona el tipo de evento"
                className="mb-3"
                name="idTipoEvento"
                value={reservaData.idTipoEvento}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar tipo de evento</option>
                {eventTypes.map(({ id_tipo_evento, nombre }) => (
                  <option key={id_tipo_evento} value={id_tipo_evento}>
                    {nombre}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Por favor, selecciona un tipo de evento.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              className="d-flex flex-column w-100"
              controlId="formularioReserva"
            >
              <Form.Label className="text-start">
                Descripción de tu evento
              </Form.Label>
              <Form.Control
                as="textarea"
                name="descripcion"
                value={reservaData.descripcion}
                onChange={handleInputChange}
                placeholder="Ingresa la descripción de tu evento"
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, proporciona una descripción.
              </Form.Control.Feedback>
            </Form.Group>
            <Modal.Footer>
              <Button variant="primary" type="submit">
                Enviar solicitud
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={showSuccess}
        onHide={handleCloseSuccess}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Solicitud enviada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Tu solicitud ha sido enviada exitosamente.</p>
          <p>
            El ID de tu reserva es: <b>{idReserva}</b>
          </p>
          <p>
            Por favor, guarda tu ID, pues servirá en caso de querer cancelar tu
            reserva en algún momento.
          </p>
          <b>
            <p>Instrucciones de pago:</p>
          </b>
          <p>
            Recuerda realizar tu pago de $xxx en la cuenta para que tu solicitud
            pueda ser confirmada:
          </p>
          <p>Cuenta clave: XXXX XXXX XXXX</p>
          <p>Nombre de la cuenta: TOPOS FC</p>
          <p>Envía el comprobante a correo@gmail.com</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccess}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default ModalFormulario;
