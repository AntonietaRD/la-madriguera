import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esMxLocale from "@fullcalendar/core/locales/es";
import "./ReservaCalendario.css";
import { Button, Form, Modal } from "react-bootstrap";
import DatosUsuario from "../../DatosUsuario/DatosUsuario.tsx";
import getFormatedDay from "./getFormatedDay.ts";
import getFormatedTime from "./getFormatedTime.ts";
import ModalFormulario from "../ModalFormulario/ModalFormulario.tsx";
import config from "../../../../config.ts";
import axios from "axios";
import { ReservaData } from "../../../../types/types.ts";

function ReservaCalendario() {
  const [reservaData, setReservaData] = useState<ReservaData>({
    descripcion: "",
    idTipoEvento: 0,
    nombreReservador: "",
    apellidoReservador: "",
    emailReservador: "",
    telefonoReservador: "",
    timestampInicio: "",
    timestampFin: "",
  });
  const [show, setShow] = useState(false);
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get(
          `${config.apiUrl}/reservas/obtener-reservas-calendario`,
        );
        const fetchedEvents = response.data.data.map(
          (event: {
            nombre: any;
            timestamp_inicio: any;
            timestamp_fin: any;
          }) => ({
            title: event.nombre,
            start: event.timestamp_inicio,
            end: event.timestamp_fin,
          }),
        );
        setEvents(fetchedEvents);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReservas();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setReservaData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.name === "idTipoEvento"
          ? parseInt(e.target.value)
          : e.target.value,
    }));
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleDateSelect = (selectInfo: {
    startStr: string;
    endStr: string;
  }) => {
    setReservaData((prev) => ({
      ...prev,
      ["timestampInicio"]: selectInfo.startStr,
      ["timestampFin"]: selectInfo.endStr,
    }));

    const formattedDay = getFormatedDay(selectInfo.startStr);
    setDate(formattedDay);

    const formattedStartTime = getFormatedTime(selectInfo.startStr);
    setStartTime(formattedStartTime);

    const formattedEndTime = getFormatedTime(selectInfo.endStr);
    setEndTime(formattedEndTime);

    handleShow();
  };

  const handleEventClick = (_clickInfo: any) => {
    return;
  };

  const checkOverlap = (selectInfo: {
    startStr: string | number | Date;
    endStr: string | number | Date;
  }) => {
    const start = new Date(selectInfo.startStr);
    const end = new Date(selectInfo.endStr);
    return !events.some((event) => {
      // @ts-ignore
      const eventStart = new Date(event.start);
      // @ts-ignore
      const eventEnd = new Date(event.end);
      return start < eventEnd && end > eventStart;
    });
  };

  return (
    <div className="pb-5 h-auto bg-light p-3 rounded-3 shadow">
      <h3>Escoge una fecha y horario</h3>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev,next today",
          right: "timeGridWeek,timeGridDay",
        }}
        allDaySlot={false}
        initialView="timeGridWeek"
        slotMinTime="09:00:00"
        slotMaxTime="19:00:00"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
        locale={esMxLocale}
        selectOverlap={checkOverlap}
      />
      <ModalFormulario
        show={show}
        handleClose={handleClose}
        date={date}
        startTime={startTime}
        endTime={endTime}
        reservaData={reservaData}
        handleInputChange={handleInputChange}
      />
    </div>
  );
}

export default ReservaCalendario;
