import Header from "./componets/Header";
import "./App.css";
import { Container } from "react-bootstrap";
import { Routing } from "./Pages";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function App() {
  const { pathname } = useLocation();

  const noLayoutRoutes = ["/login"];

  const showLayout = !noLayoutRoutes.includes(pathname);

  return (
    <div style={{ height: "fit-content" }}>
      {showLayout && <Header />}
      <main className={"min-vh-100 h-auto bg-color"}>
        <Container
          fluid
          className="d-flex align-items-center justify-content-center px-0"
        >
          <Routing />
        </Container>
      </main>
    </div>
  );
}

const DynamicMarginComponent: React.FC = () => {
  const [margin, setMargin] = useState(0);

  const updateMargin = () => {
    const newMargin = window.innerWidth * 0.05;
    setMargin(newMargin);
  };

  useEffect(() => {
    updateMargin();
    window.addEventListener("resize", updateMargin);
    return () => {
      window.removeEventListener("resize", updateMargin);
    };
  }, []);

  return (
    <div style={{ margin: `${margin}px` }}>
      <div className="container"></div>
    </div>
  );
};

export default App;
export { DynamicMarginComponent };
