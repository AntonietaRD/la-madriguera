import {useParams} from "react-router-dom";
import TablaLiga from "../../components/TablaLiga/TablaLiga.tsx";

function EstadisticasPorLiga() {
	const {idLiga, nombreLiga} = useParams();

	if (!idLiga) return;

	return (
		<section
			className={
				"w-100 d-flex flex-column justify-content-start gap-5 align-items-center"
			}
		>
			<h1>🗒️ Tabla de {nombreLiga}</h1>
			<TablaLiga idLiga={idLiga}/>
		</section>
	);
}

export default EstadisticasPorLiga;
