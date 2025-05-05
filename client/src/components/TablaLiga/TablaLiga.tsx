import React, {useEffect, useState} from 'react';
import {Table} from "react-bootstrap";
import {TeamStats} from "../../types/types.ts";
import axios from "axios";
import config from "../../config.ts";

type TablaLigaProps = {
	idLiga: string
}

const TablaLiga = ({idLiga}: TablaLigaProps) => {
	const [data, setData] = useState<TeamStats[]>([]);
	const [sortAsc, setSortAsc] = useState(false);

	useEffect(() => {
		const obtenerStatsLiga = async () => {
			try {
				const ligaData = await axios.get(
					`${config.apiUrl}/stats/obtener-tabla-liga`,
					{
						params: {
							id_liga: idLiga,
						},
					},
				);
				sortByPTS(ligaData.data.results);
			} catch (err) {
				console.error(err);
			}
		};
		obtenerStatsLiga();
	}, [idLiga]);

	useEffect(() => {
		sortByPTS(data);
	}, [sortAsc]);

	const sortByPTS = (dataToSort: TeamStats[]) => {
		const sortedData = [...dataToSort].sort((a, b) =>
			sortAsc ? a.PTS - b.PTS : b.PTS - a.PTS,
		);
		setData(sortedData);
	};

	return data.length > 0 ? (
		<Table striped bordered className="w-75 shadow">
			<thead>
			<tr>
				<th>Equipo</th>
				<th>JJ</th>
				<th>PG</th>
				<th>PP</th>
				<th>PE</th>
				<th>GF</th>
				<th>GC</th>
				<th>DF</th>
				<th
					onClick={() => {
						setSortAsc(!sortAsc);
					}}
					style={{cursor: "pointer"}}
				>
					PTS {sortAsc ? "▲" : "▼"}
				</th>
			</tr>
			</thead>
			<tbody>
			{data.map((team, index) => (
				<tr key={index}>
					<td>{team.equipo_nombre}</td>
					<td>{team.JJ}</td>
					<td>{team.PG}</td>
					<td>{team.PP}</td>
					<td>{team.PE}</td>
					<td>{team.GF}</td>
					<td>{team.GC}</td>
					<td>{team.DF}</td>
					<td>{team.PTS}</td>
				</tr>
			))}
			</tbody>
		</Table>
	) : (<p>No hay equipos disponibles</p>);
};

export default TablaLiga;