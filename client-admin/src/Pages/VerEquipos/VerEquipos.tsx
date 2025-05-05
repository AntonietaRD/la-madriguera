import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import axios from "axios";
import config from "../../config.ts";
import { useNavigate, useParams } from "react-router-dom";
import { Equipo } from "../../types/types.ts";
import { capitalizeFirstLetter } from "../../utils/utils.ts";

const VerEquipos = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const { idLiga } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerEquipos = async () => {
      try {
        const equiposResponse = await axios.get(
          `${config.apiUrl}/ligas/obtener-equipos?id=${idLiga}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          },
        );
        setEquipos(equiposResponse.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    obtenerEquipos();
  }, []);

  return (
    <Container className="vw-100 vh-100 d-flex flex-column align-items-center justify-content-center">
      <h2>Equipos</h2>
      {equipos.length > 0 ? (
        <Table className="table table-striped w-50 shadow">
          <thead>
            <tr>
              <th>Nombre equipo</th>
              <th>Estado Inscripción</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {equipos &&
              equipos.map((equipo) => (
                <tr>
                  <th>{equipo.nombre}</th>
                  <th>{capitalizeFirstLetter(equipo.estado_inscripcion)}</th>
                  <th>
                    <Button
                      onClick={() => {
                        navigate(
                          `/ligas/${idLiga}/equipos/${equipo.id_equipo}`,
                        );
                      }}
                    >
                      Ver jugadores
                    </Button>
                  </th>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <p>No hay equipos registrados para esta liga</p>
      )}
    </Container>
  );
};

export default VerEquipos;
