import {FormControl, FormGroup, FormLabel} from "react-bootstrap";

type InfoJugadorProps = {
	numJugador: number
}

function InfoJugador({numJugador}: InfoJugadorProps) {
	return (
		<section className={"d-flex flex-column justify-content-start align-items-start"}>
			<h4>Jugador {numJugador}</h4>
			<div className={"d-flex flex-row w-100 gap-4"}>
				<FormGroup className={"flex-grow-1"}>
					<FormLabel>Nombre del jugador</FormLabel>
					<FormControl type={"text"}/>
				</FormGroup>
				<FormGroup className={"flex-grow-1"}>
					<FormLabel>Correo electrónico</FormLabel>
					<FormControl type={"email"}/>
				</FormGroup>
			</div>
		</section>
	)
}

export default InfoJugador;