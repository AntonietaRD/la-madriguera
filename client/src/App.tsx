import "./App.css";
import { Container } from "react-bootstrap";
import Footer from "./components/layout/Footer/Footer.tsx";
import Header from "./components/layout/Header/Header.tsx";
import { Routing } from "./pages";
import { useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();

  const noHeaderFooterRoutes = ["/formulario-ind", "/torneos/inscripcion"];

  const showHeaderFooter = !noHeaderFooterRoutes.includes(pathname);

  return (
    <div style={{ height: "fit content" }}>
      {showHeaderFooter && <Header />}
      <main className={`min-vh-100 h-auto w-100 bg-color py-5`}>
        <Container
          fluid
          className={"d-flex justify-content-center align-items-center "}
        >
          <Routing />
        </Container>
      </main>
      {showHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
