import { Form } from "react-bootstrap";
import ReservaCalendario from "./ReservaCalendario/ReservaCalendario.tsx";

function DatosReserva() {
  return (
    <div className="d-flex flex-column w-100 h-75 gap-3">
      <ReservaCalendario />
    </div>
  );
}

export default DatosReserva;
