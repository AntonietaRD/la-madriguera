export type ReservaData = {
  descripcion: string;
  idTipoEvento: number;
  nombreReservador: string;
  apellidoReservador: string;
  emailReservador: string;
  telefonoReservador: string;
  timestampInicio: string;
  timestampFin: string;
};

export type Partido = {
  equipo_1: string;
  equipo_2: string;
  goles_equipo_1: number;
  goles_equipo_2: number;
  timestamp_inicio: string; // Using string for ISO date format
};

export type TeamStats = {
  equipo_nombre: string;
  JJ: number;
  PG: number;
  PP: number;
  PE: number;
  GF: string;
  GC: string;
  DF: string;
  PTS: number;
};