import React, {useEffect, useState} from 'react';
import {Form} from 'react-bootstrap';
import config from "../../../../sitio-topos-frontend-admin/src/config.ts";
import TablaLiga from "../../components/TablaLiga/TablaLiga.tsx";
import axios from "axios";

type Liga = {
	id_liga: number;
	nombre: string;
	descripcion: string;
	genero: string;
	tipo: string;
};


const Estadisticas = () => {
	const [ligaSeleccionada, setLigaSeleccionada] = useState("");
	const [ligas, setLigas] = useState<Liga[]>([]);

	useEffect(() => {
		const obtenerLigas = async () => {
			try {
				const ligasResponse = await axios.get(
					`${config.apiUrl}/ligas/obtener-info-ligas`,
					{
						headers: {
							"ngrok-skip-browser-warning": "true",
						},
					},
				);
				setLigas(ligasResponse.data.data);
			} catch (error) {
				console.error("Error al obtener Ligas", error);
			}
		};
		obtenerLigas();
	}, []);

	return (
		<section className="w-100 d-flex flex-column justify-content-start gap-3 align-items-center">
			<h1>📊 Estadisticas</h1>
			<Form.Select
				aria-label="liga"
				value={ligaSeleccionada}
				onChange={(e) => setLigaSeleccionada(e.target.value)}
				className="w-25"
			>
				<option value="">Selecciona una liga</option>
				{ligas.map((liga) => (
					<option key={liga.id_liga} value={liga.id_liga}>
						{liga.nombre}
					</option>
				))}
			</Form.Select>
			{ligaSeleccionada && (
				<TablaLiga idLiga={ligaSeleccionada} />
			)}
		</section>
	);
};

export default Estadisticas;