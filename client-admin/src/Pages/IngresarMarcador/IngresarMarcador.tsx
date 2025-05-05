import { Button, Form, Alert, Row, Col, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.ts";
import { Equipo } from "../../types/types.ts";

// Define el tipo para una liga
type Liga = {
  id_liga: number;
  nombre: string;
  descripcion: string;
  genero: string;
  tipo: string;
};

function IngresarMarcador() {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [equipo1, setEquipo1] = useState<string>("");
  const [equipo2, setEquipo2] = useState<string>("");
  const [ligas, setLigas] = useState<Liga[]>([]);
  const [ligaSeleccionada, setLigaSeleccionada] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [puntaje1, setPuntaje1] = useState<string>("");
  const [puntaje2, setPuntaje2] = useState<string>("");

  // Estado para el modal
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const handleCloseModal = () => setShowModal(false);

  const resetForm = () => {
    setEquipo1("");
    setEquipo2("");
    setLigaSeleccionada("");
    setPuntaje1("");
    setPuntaje2("");
  }

  const onSuccessSubmit = () => {
    setModalTitle("Registro de partido exitoso");
    setModalMessage("El marcador de partido ha sido registrado exitosamente.");
    setShowModal(true);
    resetForm();
  };

  const onFailSubmit = () => {
    setModalTitle("Error en el registro del partido");
    setModalMessage("Hubo un problema al registrar el marcador del partido.");
    setShowModal(true);
  };

  // Genera una lista de números del 0 al 20
  const numbers = Array.from({ length: 21 }, (_, i) => i);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const ligasResponse = await axios.get(
          `${config.apiUrl}/ligas/obtener-info-ligas`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          },
        );
        setLigas(ligasResponse.data.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError("Error al obtener los datos");
      } finally {
        setLoading(false);
      }
    };
    obtenerDatos();
  }, []);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const equiposResponse = await axios.get(
          `${config.apiUrl}/ligas/obtener-equipos?id=${ligaSeleccionada}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          },
        );
        setEquipos(equiposResponse.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError("Error al obtener los datos");
      } finally {
        setLoading(false);
      }
    };
    if (ligaSeleccionada) {
      obtenerDatos();
    }
  }, [ligaSeleccionada]);

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    equipo: "equipo1" | "equipo2",
  ) => {
    const selectedValue = e.target.value;

    if (equipo === "equipo1") {
      setEquipo1(selectedValue);
    } else {
      setEquipo2(selectedValue);
    }

    // Verifica si los equipos son iguales después de actualizar el estado
    if (
      (equipo === "equipo1" && selectedValue === equipo2) ||
      (equipo === "equipo2" && selectedValue === equipo1)
    ) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false); // Oculta la alerta
    setEquipo1(""); // Restablece el valor de equipo1 a cadena vacía
    setEquipo2(""); // Restablece el valor de equipo2 a cadena vacía
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.apiUrl}/stats/registrar-resultado`,
        {
          id_torneo: ligaSeleccionada,
          equipo_1: equipo1,
          equipo_2: equipo2,
          goles_equipo_1: puntaje1,
          goles_equipo_2: puntaje2,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        },
      );

      if (response.data.success) {
        onSuccessSubmit()
      } else {
        onFailSubmit();
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Ocurrió un error al enviar los datos");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section
      className={
        "d-flex flex-column justify-content-center align-items-center w-75"
      }
    >
      <h2 className="mb-5">Ingresar marcador de partido</h2>
      <Form
        onSubmit={handleSubmit}
        className={
          "w-75 d-flex flex-column justify-content-start gap-5 align-items-center bg-light shadow rounded-5 p-3"
        }
      >
        <Row>
          <Col>
            <Form.Label>Selecciona una liga</Form.Label>
            <Form.Select
              aria-label="liga"
              value={ligaSeleccionada}
              onChange={(e) => setLigaSeleccionada(e.target.value)}
            >
              <option value="">Selecciona una liga</option>
              {ligas.map((liga) => (
                <option key={liga.id_liga} value={liga.id_liga}>
                  {liga.nombre}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>
        {ligaSeleccionada && (
          <>
            {equipos.length === 0 ? (
              <p>No hay equipos registrados</p>
            ) : (
              <Row>
                <Col>
                  <Form.Label>Equipo 1</Form.Label>
                  <Form.Select
                    aria-label="Equipo 1"
                    className="bg-success text-light"
                    value={equipo1}
                    onChange={(e) => handleSelectChange(e, "equipo1")}
                  >
                    <option value="">Selecciona Equipo 1</option>
                    {equipos.map((equipo) => (
                      <option key={equipo?.id_equipo} value={equipo?.id_equipo}>
                        {equipo?.nombre}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Label>Equipo 2</Form.Label>
                  <Form.Select
                    aria-label="Equipo 2"
                    className="bg-danger text-light"
                    value={equipo2}
                    onChange={(e) => handleSelectChange(e, "equipo2")}
                  >
                    <option value="">Selecciona Equipo 2</option>
                    {equipos.map((equipo) => (
                      <option key={equipo?.id_equipo} value={equipo?.id_equipo}>
                        {equipo?.nombre}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            )}
          </>
        )}
        <Row>
          {equipo1 && (
            <Col>
              <Form.Label>Marcador del equipo 1</Form.Label>
              <Form.Select
                aria-label="Puntaje 1"
                className="bg-success text-light"
                value={puntaje1}
                onChange={(e) => setPuntaje1(e.target.value)}
              >
                <option>Selecciona el puntaje</option>
                {numbers.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </Form.Select>
            </Col>
          )}
          {equipo2 && (
            <Col>
              <Form.Label>Marcador del equipo 2</Form.Label>
              <Form.Select
                aria-label="Puntaje 2"
                className="bg-danger text-light"
                value={puntaje2}
                onChange={(e) => setPuntaje2(e.target.value)}
              >
                <option>Selecciona el puntaje</option>
                {numbers.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </Form.Select>
            </Col>
          )}
        </Row>

        {/* Alerta para mostrar si los equipos seleccionados son iguales */}
        {showAlert && (
          <Alert variant="danger" onClose={handleAlertClose} dismissible>
            No puedes seleccionar el mismo equipo dos veces
          </Alert>
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

        <div className="mb-2">
          <Button
            variant="primary"
            size="lg"
            type="submit"
            disabled={showAlert || !!error}
          >
            Subir resultados
          </Button>{" "}
        </div>
      </Form>
    </section>
  );
}

export default IngresarMarcador;
