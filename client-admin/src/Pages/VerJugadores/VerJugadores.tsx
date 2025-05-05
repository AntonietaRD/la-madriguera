import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config.ts";
import { Jugador } from "../../types/types.ts";
import { Container, Table } from "react-bootstrap";

const VerJugadores = () => {
  const { idLiga, idEquipo } = useParams();
  const [jugadores, setJugadores] = useState<Jugador[]>([]);

  useEffect(() => {
    const obtenerJugadores = async () => {
      try {
        const jugadoresResponse = await axios.get(
          `${config.apiUrl}/ligas/obtener-jugadores?idLiga=${idLiga}&idEquipo=${idEquipo}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          },
        );
        console.log(jugadoresResponse.data);

        setJugadores(jugadoresResponse.data.results);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    obtenerJugadores();
  }, []);

  return (
    <Container className="vw-100 vh-100 d-flex flex-column align-items-center justify-content-center">
      <h2>Jugadores</h2>
      {jugadores.length > 0 ? (
        <Table striped bordered hover className="w-75 shadow">
          <thead>
            <tr>
              <th>Nombre equipo</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Telefono</th>
              <th>Edad</th>
              <th>Colonia</th>
              <th>Como se enteró?</th>
            </tr>
          </thead>
          <tbody>
            {jugadores &&
              jugadores.map((jugador) => (
                <tr>
                  <th>{jugador.nombre_equipo}</th>
                  <th>{jugador.nombre_jugador}</th>
                  <th>{jugador.apellido}</th>
                  <th>{jugador.correo}</th>
                  <th>{jugador.telefono}</th>
                  <th>{jugador.edad}</th>
                  <th>{jugador.colonia}</th>
                  <th>{jugador.como_te_enteraste}</th>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <p>No hay jugadores registrados para este equipo</p>
      )}
    </Container>
  );
};

export default VerJugadores;
