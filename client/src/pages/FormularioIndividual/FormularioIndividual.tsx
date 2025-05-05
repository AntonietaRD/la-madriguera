import { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import styles from "./FormularioIndividual.module.css";
import axios from "axios";
import config from "../../config";
import { useMediaQuery } from "react-responsive";
import { isPhoneValid } from "../../utils/utils.ts";

const FormularioIndividual = () => {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({
    correo: "",
    nombre: "",
    apellido: "",
    edad: "",
    colonia: "",
    telefono: "",
    como_te_enteraste: "",
    token: "",
    equipoId: "",
    inscripcionId: "",
    isAdult: "",
    consent: false,
    commitment: false,
    exoneration: false,
    medicalAuthorization: false,
    medicalInfoResponsibility: false,
  });
  const [validated, setValidated] = useState(false);

  // Function to extract token and id from the URL
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(hash.indexOf("?") + 1));
    const token = params.get("token");
    const inscripcionId = params.get("inscripcionId");
    const equipoId = params.get("equipoId");
    setFormData((prevData) => ({
      ...prevData,
      token: token || "",
      inscripcionId: inscripcionId || "",
      equipoId: equipoId || "",
    }));
  }, []);

  // Estado para el modal
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const handleCloseModal = () => setShowModal(false);

  // @ts-ignore
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true); // Esto activará los mensajes de error de Bootstrap si los hay
      return; // Detener la ejecución si el formulario no es válido
    }

    // Si el formulario es válido, procede con la extracción de datos y envío
    const submissionData = {
      correo: formData.correo,
      nombre: formData.nombre,
      apellido: formData.apellido,
      edad: formData.edad,
      colonia: formData.colonia,
      telefono: formData.telefono,
      como_te_enteraste: formData.como_te_enteraste,
      token: formData.token,
      equipoId: parseInt(formData.equipoId),
      inscripcionId: parseInt(formData.inscripcionId),
    };

    try {
      await axios.post(
        `${config.apiUrl}/ligas/inscribir-jugador`,
        submissionData
      );
      onSuccessSubmit();
    } catch (err) {
      onFailSubmit();
    }
  };

  const onSuccessSubmit = () => {
    setModalTitle("Inscripción Exitosa");
    setModalMessage("El integrante se ha inscrito correctamente.");
    setShowModal(true);
    resetForm();
  };

  const onFailSubmit = () => {
    setModalTitle("Error en la Inscripción");
    setModalMessage("Hubo un problema al inscribirte.");
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      correo: "",
      nombre: "",
      apellido: "",
      edad: "",
      colonia: "",
      telefono: "",
      como_te_enteraste: "",
      token: "",
      equipoId: "",
      inscripcionId: "",
      isAdult: "",
      consent: false,
      commitment: false,
      exoneration: false,
      medicalAuthorization: false,
      medicalInfoResponsibility: false,
    });
    setValidated(false);
    setPage(1);
  };

  // @ts-ignore
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrev = () => {
    setPage((prevPage) => prevPage - 1);
  };

  // Use useMediaQuery to detect screen size
  const isMobile = useMediaQuery({ maxWidth: 780 });

  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      className={`${
        isMobile ? "w-100" : "w-50"
      } d-flex flex-column align-items-center justify-content-center`}
    >
      <h2>Unete a tu equipo para jugar en la Madriguera!</h2>
      {page === 1 && (
        <>
          {/* Los campos para la primera página del formulario */}
          <FormGroup
            as={Row}
            className={`mb-3 ${styles.formGroup}`}
            controlId="formCorreo"
          >
            <FormLabel column sm={9} className="text-start">
              Correo electrónico
            </FormLabel>
            <Col sm={9}>
              <FormControl
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, introduce un correo válido.
              </Form.Control.Feedback>
            </Col>
          </FormGroup>

          <FormGroup
            as={Row}
            className={`mb-3 ${styles.formGroup}`}
            controlId="formNombre"
          >
            <FormLabel column sm={9} className="text-start">
              Nombre(s)
            </FormLabel>
            <Col sm={9}>
              <FormControl
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, introduce tu nombre.
              </Form.Control.Feedback>
            </Col>
          </FormGroup>

          <FormGroup
            as={Row}
            className={`mb-3 ${styles.formGroup}`}
            controlId="formApellido"
          >
            <FormLabel column sm={9} className="text-start">
              Apellidos
            </FormLabel>
            <Col sm={9}>
              <FormControl
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, introduce tus apellidos.
              </Form.Control.Feedback>
            </Col>
          </FormGroup>

          <FormGroup
            as={Row}
            className={`mb-3 ${styles.formGroup}`}
            controlId="formEdad"
          >
            <FormLabel column sm={9} className="text-start">
              Edad
            </FormLabel>
            <Col sm={9}>
              <FormControl
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                required
                min="1"
              />
              <Form.Control.Feedback type="invalid">
                Por favor, introduce una edad válida.
              </Form.Control.Feedback>
            </Col>
          </FormGroup>

          <FormGroup
            as={Row}
            className={`mb-3 ${styles.formGroup}`}
            controlId="formColonia"
          >
            <FormLabel column sm={9} className="text-start">
              Colonia
            </FormLabel>
            <Col sm={9}>
              <FormControl
                type="text"
                name="colonia"
                value={formData.colonia}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, introduce tu colonia.
              </Form.Control.Feedback>
            </Col>
          </FormGroup>

          <FormGroup
            as={Row}
            className={`mb-3 ${styles.formGroup}`}
            controlId="formTelefono"
          >
            <FormLabel column sm={9} className="text-start">
              Teléfono de contacto (WhatsApp)
            </FormLabel>
            <Col sm={9}>
              <FormControl
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                isInvalid={!isPhoneValid(formData.telefono)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Por favor, introduce un número de teléfono válido.
              </Form.Control.Feedback>
            </Col>
          </FormGroup>

          <FormGroup
            as={Row}
            className={`mb-3 ${styles.formGroup}`}
            controlId="formComoTeEnteraste"
          >
            <FormLabel column sm={9} className="text-start">
              ¿Cómo te enteraste de la Liga de Fútbol 5 "Madriguera"?
            </FormLabel>
            <Col sm={9}>
              <FormControl
                as="select"
                name="como_te_enteraste"
                value={formData.como_te_enteraste}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una opción</option>
                <option value="Redes Sociales de la Liga">
                  Redes Sociales de la Liga
                </option>
                <option value="Redes Sociales de Topos FC">
                  Redes Sociales de Topos FC
                </option>
                <option value="Invitación Directa">Invitación Directa</option>
                <option value="Publicidad Física">Publicidad Física</option>
                <option value="Otra">Otra</option>
              </FormControl>
              <Form.Control.Feedback type="invalid">
                Por favor, selecciona cómo te enteraste de la liga.
              </Form.Control.Feedback>
            </Col>
          </FormGroup>

          <Button variant="primary" onClick={handleNext}>
            Siguiente
          </Button>
        </>
      )}

      {page === 2 && (
        <>
          <FormGroup className="w-100 mb-3" controlId="formIsAdult">
            <FormLabel className="w-100 text-start">
              Eres mayor de edad?
            </FormLabel>
            <div>
              <Form.Check
                type="radio"
                label="Sí"
                name="isAdult"
                value="true"
                checked={formData.isAdult === "true"}
                onChange={handleChange}
                required
                className={"text-start"}
              />
              <Form.Check
                type="radio"
                label="No"
                name="isAdult"
                value="false"
                checked={formData.isAdult === "false"}
                onChange={handleChange}
                required
                className={"text-start"}
              />
            </div>
          </FormGroup>

          {formData.isAdult !== "" && formData.isAdult === "true" && (
            <FormGroup className="mb-5">
              <Form.Check
                type="checkbox"
                label="Soy mayor de edad y autorizo el uso de mi imagen en usos de multimedia para la difusión del evento, a través del Comité Organizador del Torneo de Fútbol 5 'Madriguera'"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                required
                className={"text-start"}
              />
            </FormGroup>
          )}

          {formData.isAdult !== "" && formData.isAdult === "false" && (
            <FormGroup className="mb-5">
              <Form.Check
                type="checkbox"
                label="Soy madre, padre o tutor de un menor de edad y autorizo el uso de imagen de mi hijo/a en usos de multimedia para la difusión del evento, a través del Comité Organizador del Torneo de Fútbol 5 'La Madriguera'"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                required
                className={"text-start"}
              />
            </FormGroup>
          )}

          <FormGroup className="mb-3">
            <Form.Check
              type="checkbox"
              label="Me comprometo a no ingerir bebidas alcohólicas ni estupefacientes en ningún espacio designado para La Liga de Fútbol 5 'Madriguera'"
              name="commitment"
              onChange={handleChange}
              required
              className={"text-start"}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <Form.Check
              type="checkbox"
              label="Deslindo y exonero de toda responsabilidad al Comité organizador de la Liga de Fútbol 5 'Madriguera' sus empleados, voluntarios, beneficiarios, consejeros, patrocinadores y demás relacionados al evento; de cualquier incidente."
              name="exoneration"
              onChange={handleChange}
              required
              className={"text-start"}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <Form.Check
              type="checkbox"
              label="Autorizo al Comité Organizador de la Liga de Fútbol 5 'Madriguera' o a quien designe a que en caso de que ocurra algún incidente durante LAS ACTIVIDADES se me brinde la atención necesaria, y en dado caso, el traslado a alguna Unidad Médica cercana, con la finalidad de que se atienda la emergencia y deslindo de toda responsabilidad al Comité Organizador de la Liga de Fútbol 5 'Madriguera'  y LOS COLABORADORES por las acciones aquí referidas o por las consecuencias inmediatas o futuras que se pudieran derivar de las mismas."
              name="medicalAuthorization"
              onChange={handleChange}
              required
              className="text-start"
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <Form.Check
              type="checkbox"
              label="Acepto que es mi responsabilidad la certeza y suficiencia de la información médica entregada al Comité Organizador de la Liga de Fútbol 5 'Madriguera' que sea relevante, desde el momento de la inscripción y/o antes de participar en LAS ACTIVIDADES, y que esta información será proporcionada a las personas que me atiendan en caso de accidente."
              name="medicalInfoResponsibility"
              onChange={handleChange}
              required
              className={"text-start"}
            />
          </FormGroup>

          <div>
            <Button variant="secondary" onClick={handlePrev} className="me-2">
              Anterior
            </Button>
            <Button variant="primary" type="submit">
              Enviar
            </Button>
          </div>
        </>
      )}

      {/* Modal para mostrar mensajes */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
};

export default FormularioIndividual;
