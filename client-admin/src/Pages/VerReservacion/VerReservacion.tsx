import {useState, useEffect} from "react";
import {Card, CardGroup, ListGroup, Button, Table} from "react-bootstrap";
import axios from "axios";
import config from "../../config.ts";
import {capitalizeFirstLetter} from "../../utils/utils.ts";

interface Reserva {
	id_reserva: number;
	estado: string;
	descripcion: string;
	tipo_evento: string;
	nombre_reservador: string;
	apellido_reservador: string;
	email_reservador: string;
	telefono_reservador: number;
	timestamp_inicio: string;
	timestamp_fin: string;
}

function VerReservacion() {
	const [reservas, setReservas] = useState<Reserva[]>([]);

	useEffect(() => {
		const fetchReservas = async () => {
			try {
				const response = await axios.get(
					`${config.apiUrl}/reservas/obtener-reservas-admin`,
					{
						headers: {
							"ngrok-skip-browser-warning": "true",
						},
					},
				);
				console.log(response);
				// Asegúrate de que la estructura de la respuesta es como esperas
				if (response.data && response.data.data) {
					setReservas(response.data.data); // Usando los datos como se espera
				} else {
					throw new Error("Estructura de datos inesperada");
				}
			} catch (error) {
				console.error("Error fetching reservations:", error);
			}
		};

		fetchReservas();
	}, []);

	const handleStatusSubmit = async (id: number, nuevoEstado: string) => {
		// Asegúrate de que el nuevoEstado es uno de los permitidos
		const estadosValidos = ["pendiente", "confirmada", "rechazada"];
		if (!estadosValidos.includes(nuevoEstado)) {
			console.log("El estado proporcionado no es válido.");
			return;
		}

		try {
			console.log("ola");
			const response = await axios.post(
				`${config.apiUrl}/reservas/modificar-estado-reserva`,
				{
					reservaId: id, // Cambia de 'id_reserva' a 'reservaId'
					nuevoEstado: nuevoEstado, // Cambia de 'nuevo_estado' a 'nuevoEstado'
				},
			);

			if (response.data.success) {
				console.log("Estado actualizado con éxito");
				// Actualizar el estado de las reservas en el estado local del componente
				setReservas(
					reservas.map((reserva) =>
						reserva.id_reserva === id
							? {...reserva, estado: nuevoEstado}
							: reserva,
					),
				);
			} else {
				console.log("Error al actualizar el estado");
			}
		} catch (error) {
			console.error("Error al actualizar el estado:", error);
			console.log("Ocurrió un error al actualizar el estado");
		}
	};

	const formatDate = (dateString: string): string => {
		const options: Intl.DateTimeFormatOptions = {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		};
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	return (
		<section className="d-flex flex-column justify-content-center align-items-center">
			<h2>Reservas</h2>
			{reservas.length > 0 ? (
				<Table hover style={{width: "90%"}} className="shadow">
					<thead>
					<tr>
						<th>ID</th>
						<th>Tipo de Evento</th>
						<th>Estado</th>
						<th>Descripción</th>
						<th>Fecha de Inicio</th>
						<th>Fecha de Fin</th>
						<th>Nombre Reservador</th>
						<th>Apellido Reservador</th>
						<th>Teléfono</th>
						<th>Email</th>
						<th>Acciones</th>
					</tr>
					</thead>
					<tbody>
					{reservas.map((reserva) => (
						<tr key={reserva.id_reserva}>
							<td>{reserva.id_reserva}</td>
							<td>{reserva.tipo_evento}</td>
							<td
								style={{
									color: reserva.estado === "confirmada" ? "green" : "red",
								}}
							>
								{capitalizeFirstLetter(reserva.estado)}
							</td>
							<td>{reserva.descripcion}</td>
							<td>{formatDate(reserva.timestamp_inicio)}</td>
							<td>{formatDate(reserva.timestamp_fin)}</td>
							<td>{reserva.nombre_reservador}</td>
							<td>{reserva.apellido_reservador}</td>
							<td>{reserva.telefono_reservador}</td>
							<td>{reserva.email_reservador}</td>
							<td>
								<div className="d-flex flex-column justify-content-center gap-2">
									{reserva.estado === "pendiente" && (
										<>
											<Button
												variant="success"
												onClick={() =>
													handleStatusSubmit(
														reserva.id_reserva,
														"confirmada",
													)
												}
											>
												Confirmar
											</Button>
											<Button
												variant="danger"
												onClick={() =>
													handleStatusSubmit(
														reserva.id_reserva,
														"rechazada",
													)
												}
											>
												Rechazar
											</Button>
										</>
									)}
									{reserva.estado === "confirmada" && (
										<Button
											variant="danger"
											onClick={() =>
												handleStatusSubmit(reserva.id_reserva, "rechazada")
											}
										>
											Rechazar
										</Button>
									)}
									{reserva.estado === "rechazada" && (
										<Button
											variant="success"
											onClick={() =>
												handleStatusSubmit(reserva.id_reserva, "confirmada")
											}
										>
											Confirmar
										</Button>
									)}
								</div>
							</td>
						</tr>
					))}
					</tbody>
				</Table>
			) : (
				<h3>No hay reservas disponibles.</h3>
			)}
		</section>
	);
}

export default VerReservacion;
