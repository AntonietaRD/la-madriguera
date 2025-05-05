import {Form} from "react-bootstrap";
import { isPhoneValid } from "../../../utils/utils";

// @ts-ignore
function DatosUsuario({reservaData, handleInputChange}) {

	return (
		<div className="d-flex flex-column w-100">
			<Form.Group className="d-flex flex-column mb-3" controlId="nombreReservador">
				<Form.Label className="text-start">Nombre(s)</Form.Label>
				<Form.Control
					placeholder="John"
					name="nombreReservador"
					value={reservaData.nombreReservador}
					onChange={handleInputChange}
					required
				/>
				<Form.Control.Feedback type="invalid">
					Por favor, proporciona tu nombre.
				</Form.Control.Feedback>
			</Form.Group>
			<Form.Group className="d-flex flex-column mb-3" controlId="apellidoReservador">
				<Form.Label className="text-start">Apellidos</Form.Label>
				<Form.Control
					placeholder="Doe"
					name="apellidoReservador"
					value={reservaData.apellidoReservador}
					onChange={handleInputChange}
					required
				/>
				<Form.Control.Feedback type="invalid">
					Por favor, proporciona tus apellidos.
				</Form.Control.Feedback>
			</Form.Group>
			<Form.Group className="d-flex flex-column mb-3" controlId="emailReservador">
				<Form.Label className="text-start">Correo electrónico</Form.Label>
				<Form.Control
					type="email"
					placeholder="name@example.com"
					name="emailReservador"
					value={reservaData.emailReservador}
					onChange={handleInputChange}
					required
				/>
				<Form.Control.Feedback type="invalid">
					Por favor, proporciona un correo electrónico válido.
				</Form.Control.Feedback>
			</Form.Group>
			<Form.Group className="d-flex flex-column mb-3" controlId="telefonoReservador">
				<Form.Label className="text-start">Teléfono</Form.Label>
				<Form.Control
					type="tel"
					placeholder="2221114567"
					name="telefonoReservador"
					value={reservaData.telefonoReservador}
					onChange={handleInputChange}
					required
					isInvalid={!isPhoneValid(reservaData.telefonoReservador)}
				/>
				<Form.Control.Feedback type="invalid">
					Por favor, proporciona un número de teléfono válido.
				</Form.Control.Feedback>
			</Form.Group>
		</div>
	);
}

export default DatosUsuario;