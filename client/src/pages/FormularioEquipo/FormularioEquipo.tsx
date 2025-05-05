import React, {FormEvent, useState} from "react";
import {
	Button,
	Form,
	FormControl,
	FormGroup,
	FormLabel,
	Row,
	Col,
	Modal,
} from "react-bootstrap";
import styles from "./FormularioEquipo.module.css";
import axios from "axios";
import config from "../../config.ts";
import NumeroJugadoresSelect from "./components/NumeroJugadoresSelect/NumeroJugadoresSelect.tsx";
import {useParams} from "react-router-dom";
import {useMediaQuery} from "react-responsive";

type DatosFormEquipo = {
	nombreEquipo: string;
	numeroJugadores: number;
	correosMiembros: string[];
};

const FormularioEquipo = () => {
	const [nombreEquipo, setNombreEquipo] = useState("");
	const [numeroJugadores, setNumeroJugadores] = useState<number>(0);
	const [correosMiembros, setCorreosMiembros] = useState<string[]>([]);
	const [validated, setValidated] = useState(false);
	const [hayEquipoConMismoNombre, setHayEquipoConMismoNombre] = useState(false);
	const {idLiga} = useParams();

	const [showModal, setShowModal] = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalMessage, setModalMessage] = useState("");

	const handleCloseModal = () => setShowModal(false);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		setValidated(true);

		if (!form.checkValidity() || numeroJugadores <= 0 || hayEquipoConMismoNombre) {
			e.stopPropagation();
		} else {
			try {
				const datosFormEquipo: DatosFormEquipo = {
					nombreEquipo,
					numeroJugadores,
					correosMiembros,
				};
				await axios.post(`${config.apiUrl}/ligas/inscribir-equipo`, datosFormEquipo, {
					params: {id: idLiga},
				});
				onSuccessSubmit();
			} catch (err) {
				onFailSubmit();
			}
		}
	};

	const onSuccessSubmit = () => {
		setModalTitle("Inscripción Exitosa");
		setModalMessage("El equipo se ha inscrito correctamente.");
		setShowModal(true);
		setValidated(false);
		resetForm();
	};

	const onFailSubmit = () => {
		setModalTitle("Error en la Inscripción");
		setModalMessage(`Hubo un problema al inscribir el equipo.`);
		setShowModal(true);
	};

	const resetForm = () => {
		setNombreEquipo("");
		setNumeroJugadores(0);
		setCorreosMiembros([]);
	};

	const handleNombreEquipoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setNombreEquipo(e.target.value)

		if (e.target.value === "") {
			setHayEquipoConMismoNombre(false);
			return
		}

		const data = {
			nombreEquipo: e.target.value,
			idLiga: idLiga
		}

		try {
			const response = await axios.post(`${config.apiUrl}/ligas/hay-equipo-con-mismo-nombre`, data);
			setHayEquipoConMismoNombre(response.data.hayEquipoConMismoNombre);
		} catch (e) {
			console.error(e);
		}
	}

	// Use useMediaQuery to detect screen size
	const isMobile = useMediaQuery({maxWidth: 780});
	return (
		<Form
			noValidate
			validated={validated}
			onSubmit={handleSubmit}
			className={isMobile ? "w-100" : "w-50"}
		>
			<h2>Registra tu equipo</h2>
			<FormGroup
				as={Row}
				className={`mb-3 ${styles.formGroup}`}
				controlId="formNombreEquipo"
			>
				<FormLabel column sm={10} className="text-start">
					Nombre del equipo
				</FormLabel>
				<Col sm={10}>
					<FormControl
						required
						type="text"
						placeholder="Ingrese el nombre del equipo"
						name="nombreEquipo"
						value={nombreEquipo}
						onChange={handleNombreEquipoChange}
						isInvalid={hayEquipoConMismoNombre}
					/>
					<Form.Control.Feedback type="invalid">
						{hayEquipoConMismoNombre
							? "Nombre de equipo ya está tomado. Elige otro."
							: "Por favor ingrese el nombre del equipo."}
					</Form.Control.Feedback>
				</Col>
			</FormGroup>

			<FormGroup
				as={Row}
				className={`mb-3 ${styles.formGroup}`}
				controlId="formNumeroJugadores"
			>
				<FormLabel column sm={10} className="text-start">
					Numero de jugadores
				</FormLabel>
				<Col sm={10}>
					<NumeroJugadoresSelect setNumeroJugadoresState={setNumeroJugadores}/>
					{numeroJugadores <= 0 && (
						<div style={{color: "red"}}>
							Seleccione un número válido de jugadores.
						</div>
					)}
				</Col>
			</FormGroup>

			{Array.from({length: numeroJugadores}, (_, i) => i).map((index) => (
				<FormGroup as={Row} className={`mb-3 ${styles.formGroup}`} key={index}>
					<FormLabel column sm={10} className="text-start">
						Correo electrónico de Integrante {index + 1}
					</FormLabel>
					<Col sm={10}>
						<FormControl
							required
							type="email"
							placeholder={`Correo electrónico de Integrante ${index + 1}`}
							value={correosMiembros[index] || ""}
							onChange={(e) => {
								const nuevosCorreos = [...correosMiembros];
								nuevosCorreos[index] = e.target.value;
								setCorreosMiembros(nuevosCorreos);
							}}
						/>
						<Form.Control.Feedback type="invalid">
							Por favor ingrese un correo electrónico válido.
						</Form.Control.Feedback>
					</Col>
				</FormGroup>
			))}

			<FormGroup as={Row} className="mt-4">
				<Col>
					<Button type="submit" disabled={numeroJugadores <= 0}>
						Enviar
					</Button>
				</Col>
			</FormGroup>

			{/* Modal para mostrar el resultado */}
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
		</Form>
	);
};

export default FormularioEquipo;
