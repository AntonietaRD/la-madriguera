export type Equipo = {
  id_equipo: number;
  nombre: string;
  estado_inscripcion: string;
};

export type Jugador = {
  nombre_equipo: string;
  nombre_jugador: string;
  correo: string;
  apellido: string;
  edad: number;
  colonia: string;
  telefono: string;
  como_te_enteraste: string;
};

export type Partido = {
  equipo_1: string;
  equipo_2: string;
  goles_equipo_1: number;
  goles_equipo_2: number;
  timestamp_inicio: string; // Using string for ISO date format
};