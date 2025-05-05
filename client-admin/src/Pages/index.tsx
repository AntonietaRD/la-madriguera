import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home.tsx";
import NuevoTorneo from "./NuevoTorneo/NuevoTorneo.tsx";
import VerLigas from "./VerLigas/VerLigas.tsx";
import IngresarMarcador from "./IngresarMarcador/IngresarMarcador.tsx";
import VerReservacion from "./VerReservacion/VerReservacion.tsx";
import Login from "./Login/Login.tsx";
import Logout from "./Logout/Logout.tsx";
import DescargarDatos from "./DescargarDatos/DescargarDatos.tsx";
import PrivateRoute from "./PrivateRoute.tsx";
import VerEquipos from "./VerEquipos/VerEquipos.tsx";
import VerJugadores from "./VerJugadores/VerJugadores.tsx";
import VerPartidos from "./VerPartidos/VerPartidos.tsx";

const routes = [
  { path: "/", element: <Home /> },
  { path: "/nuevo-torneo", element: <NuevoTorneo /> },
  { path: "/reservas", element: <VerReservacion /> },
  { path: "/ligas", element: <VerLigas /> },
  { path: "/registrar-marcador", element: <IngresarMarcador /> },
  { path: "/descargar-datos", element: <DescargarDatos /> },
  { path: "/ligas/partidos/:idLiga", element: <VerPartidos /> },
  { path: "/ligas/:idLiga/equipos", element: <VerEquipos /> },
  { path: "/ligas/:idLiga/equipos/:idEquipo", element: <VerJugadores /> },
];

const authRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/logout", element: <Logout /> },
];

function Routing() {
  const getRoutes = () =>
    routes.map(({ path, element }) => (
      <Route
        key={path}
        path={path}
        element={<PrivateRoute>{element}</PrivateRoute>}
      />
    ));

  const getAuthRoutes = () =>
    authRoutes.map(({ path, element }) => (
      <Route key={path} path={path} element={element} />
    ));

  return (
    <Routes>
      {getRoutes()}
      {getAuthRoutes()}
    </Routes>
  );
}

export { Routing };
