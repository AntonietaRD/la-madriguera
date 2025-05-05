import React from "react";
import { Button } from "react-bootstrap";
import styles from "./DescargarDatos.module.css";
import { FaDownload } from "react-icons/fa";
import {fetchDatos} from "../../utils/utils.ts";

const DescargarDatos = () => {
  return (
    <div className="w-25 d-flex justify-content-center align-items-center flex-column gap-5 p-5 bg-white rounded-3 shadow mt-5">
      <Button
        className={styles.btn}
        onClick={async () => {
          await fetchDatos("descargar-detalles-equipos", "datos_equipos");
        }}
      >
        <FaDownload />
        <span>Descargar datos de equipos</span>
      </Button>
      <Button
        className={styles.btn}
        onClick={() => {
          fetchDatos("descargar-detalles-jugadores", "datos_jugadores");
        }}
      >
        <FaDownload />
        Descargar datos de jugadores
      </Button>
      <Button
        className={styles.btn}
        onClick={() => {
          fetchDatos("descargar-reservas", "datos_reservas");
        }}
      >
        <FaDownload />
        Descargar tabla de reservas
      </Button>
    </div>
  );
};

export default DescargarDatos;
