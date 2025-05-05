import Home from "./Home/Home.tsx";
import FormularioReserva from "./FormularioReserva/FormularioReserva.tsx";
import Torneos from "./VerLigas/VerLigas.tsx";
import EstadisticasPorLiga from "./EstadisticasPorLiga/EstadisticasPorLiga.tsx";
import { Route, Routes } from "react-router-dom";
import FormularioEquipo from "./FormularioEquipo/FormularioEquipo.tsx";
import FormularioIndividual from "./FormularioIndividual/FormularioIndividual.tsx";
import Galeria from "./Galeria/galeria.tsx";
import VerPartidos from "./VerPartidos/VerPartidos.tsx";
import Estadisticas from "./Estadisticas/Estadisticas.tsx";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/reservaciones", element: <FormularioReserva /> },
  { path: "/ligas", element: <Torneos /> },
  { path: "/ligas/inscripcion/:idLiga", element: <FormularioEquipo /> },
  { path: "/estadisticas/:idLiga/:nombreLiga", element: <EstadisticasPorLiga /> },
  { path: "/estadisticas", element: <Estadisticas /> },
  { path: "/ligas/partidos/:idLiga", element: <VerPartidos /> },
  { path: "/formulario-ind", element: <FormularioIndividual /> },
  { path: "/galeria", element: <Galeria /> },
];

/**
 * Renders the routing configuration for the application.
 *
 * @return {JSX.Element} The JSX element representing the routing configuration.
 */
function Routing() {
  const getRoutes = () =>
    routes.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ));
  return <Routes>{getRoutes()}</Routes>;
}

export { Routing };
