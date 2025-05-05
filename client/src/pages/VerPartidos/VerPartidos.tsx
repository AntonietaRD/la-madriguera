import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import config from "../../../../sitio-topos-frontend-admin/src/config";
import { useParams } from "react-router-dom";
import { Partido } from "../../types/types.ts";
import MatchResult from "./MatchResult/MatchResult.tsx";
import { formatDate } from "../../utils/utils.ts";

const VerPartidos = () => {
  const [partidos, setPartidos] = useState<Partido[]>([]);
  const { idLiga } = useParams();

  useEffect(() => {
    const obtenerPartidos = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/ligas/obtener-partidos?id=${idLiga}`,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          },
        );
        setPartidos(response.data.partidos);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    obtenerPartidos();
  }, []);

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <h1 className={"mb-5"}>Partidos</h1>
      {partidos.length > 0 ? (
        partidos.map((partido, index) => (
          <MatchResult
            key={index}
            equipo_1={partido.equipo_1}
            equipo_2={partido.equipo_2}
            goles_equipo_1={partido.goles_equipo_1}
            goles_equipo_2={partido.goles_equipo_2}
            timestamp_inicio={formatDate(partido.timestamp_inicio)}
          />
        ))
      ) : (
        <p>No hay partidos disponibles</p>
      )}
    </Container>
  );
};

export default VerPartidos;
