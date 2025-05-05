import React from "react";
import "./Footer.module.css";
import { Link } from "react-router-dom";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

const Footer: React.FC = () => {
  return (
    <MDBFooter
      style={{ backgroundColor: "#fce5a5" }}
      className="text-center text-lg-start text-muted"
    >
      <section
        className="d-flex justify-content-center justify-content-lg-between p-4"
        style={{ borderBottom: "1px solid #f9ede0" }}
      >
        <div className="me-5 d-none d-lg-block p-2">
          <h2 style={{ fontSize: "1.2em", color: "#000000" }}>
            Conecta con nosotros en nuestras redes sociales:
          </h2>
        </div>
        <div>
          <a
            href="https://www.facebook.com/ToposFCPuebla"
            target="_blank"
            rel="noopener noreferrer"
            className="me-4 text-reset"
          >
            <svg
              fill="none"
              height="30"
              viewBox="0 0 24 24"
              width="30"
              xmlns="http://www.w3.org/2000/svg"
              className="align-items-left"
            >
              <path
                d="m22 16.19c0 3.64-2.17 5.81-5.81 5.81h-1.19c-.55 0-1-.45-1-1v-5.77c0-.27.22-.5.49-.5l1.76-.03c.14-.01.26-.11.29-.25l.35-1.91c.03-.18-.11-.35-.3-.35l-2.13.03c-.28 0-.5-.22-.51-.49l-.04-2.45c0-.16.13-.29999.3-.29999l2.4-.04001c.17 0 .3-.12999.3-.29999l-.04-2.40002c0-.17-.13-.29999-.3-.29999l-2.7.04001c-1.66.03-2.98 1.38999-2.95 3.04999l.05 2.75c.01.28-.21.5-.49.51l-1.2.02c-.17 0-.29999.13-.29999.3l.03 1.9c0 .17.12999.3.29999.3l1.2-.02c.28 0 .5.22.51.49l.09 5.7c.01.56-.44 1.02-1 1.02h-2.3c-3.64 0-5.81-2.17-5.81-5.82v-8.37c0-3.64 2.17-5.81 5.81-5.81h8.38c3.64 0 5.81 2.17 5.81 5.81z"
                fill="#000"
              />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/toposfcpuebla?fbclid=IwZXh0bgNhZW0CMTAAAR36TTKqQFUM6FJJXTrpHJwd04bCXwTMNv9yFAzdmlbdqJIsN4qOhxPwU5w_aem_ZmFrZWR1bW15MTZieXRlcw"
            target="_blank"
            rel="noopener noreferrer"
            className="me-4 text-reset"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="align-items-left"
              height="25"
              width="25"
            >
              <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 0 0 1.384 2.126A5.868 5.868 0 0 0 4.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 0 0 2.126-1.384 5.86 5.86 0 0 0 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 0 0-1.384-2.126A5.847 5.847 0 0 0 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.899 1.382 3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 0 1-1.379-.899 3.644 3.644 0 0 1-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@toposfcpuebla"
            target="_blank"
            rel="noopener noreferrer"
            className="me-4 text-reset"
          >
            <svg
              height="32"
              viewBox="0 0 32 32"
              width="32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m31.328 8.271c-.38-1.349-1.432-2.407-2.787-2.781-2.495-.667-12.525-.667-12.525-.667s-10.011-.016-12.532.667c-1.348.375-2.405 1.432-2.781 2.781-.473 2.557-.708 5.145-.697 7.745-.005 2.583.229 5.167.697 7.708.376 1.349 1.433 2.407 2.781 2.787 2.495.667 12.532.667 12.532.667s10.005 0 12.525-.667c1.355-.38 2.407-1.437 2.787-2.787.459-2.541.683-5.125.667-7.708.016-2.6-.203-5.188-.667-7.745zm-18.516 12.532v-9.595l8.349 4.808z" />
            </svg>
          </a>
          <a
            href="https://x.com/ToposFCPuebla"
            target="_blank"
            rel="noopener noreferrer"
            className="me-4 text-reset"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              height="32"
              width="32"
            >
              <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
            </svg>
          </a>
        </div>
      </section>
      <section
        className="d-flex justify-content-center justify-content-lg-between p-2"
        style={{ borderBottom: "1px solid #f9ede0" }}
      >
        <MDBContainer className="text-center text-md-start mt-4">
          <MDBRow className="mt-2">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-2">
              <h2
                style={{
                  color: "#000000",
                  textShadow: "5px 3px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                <MDBIcon color="secondary" icon="gem" className="me-2" />
                La Madriguera
              </h2>
              <p className="mb-2">
                Este proyecto de Topos F.C. nace para darles un espacio a la gente
                con ceguera y personas de la comunidad en donde jugar fútbol...
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-2">
              <h2
                style={{
                  color: "#000000",
                  textShadow: "5px 3px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                Enlaces
              </h2>
              <p className="mb-2">
                <Link to="/" className="text-reset">
                  Home
                </Link>
              </p>
              <p className="mb-2">
                <Link to="/ligas" className="text-reset">
                  Ligas
                </Link>
              </p>
              <p className="mb-2">
                <Link to="/estadisticas" className="text-reset">
                  Estadísticas
                </Link>
              </p>
              <p className="mb-2">
                <Link to="/reservaciones" className="text-reset">
                  Reserva nuestra cancha
                </Link>
              </p>
              <p className="mb-2">
                <Link to="/galeria" className="text-reset">
                  Galería de fotos
                </Link>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-2">
              <h2
                style={{
                  color: "#000000",
                  textShadow: "5px 3px 5px rgba(0, 0, 0, 0.1)",
                }}
              >
                Contacto
              </h2>
              <p className="mb-2 d-flex align-items-center">
                <svg
                  fill="#000000"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="40"
                  height="40"
                  viewBox="0 0 395.71 395.71"
                  xmlSpace="preserve"
                  style={{ marginRight: "8px" }}
                >
                  <g>
                    <path
                      d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738
                    c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388
                    C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191
                    c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"
                    />
                  </g>
                </svg>
                5A Sur #13926 Col. San Juan Bautista, Puebla City 72495
              </p>
              <p className="mb-2 d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 128 96"
                  id="email"
                  width="20"
                  height="20"
                  style={{ marginRight: "8px" }}
                >
                  <g>
                    <path d="M0 11.283V8a8 8 0 0 1 8-8h112a8 8 0 0 1 8 8v3.283l-64 40zm66.12 48.11a4.004 4.004 0 0 1-4.24 0L0 20.717V88a8 8 0 0 0 8 8h112a8 8 0 0 0 8-8V20.717z"></path>
                  </g>
                </svg>
                contacto@toposfc.org
              </p>
              <p className="mb-2 d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 32 32"
                  id="phone"
                  style={{ marginRight: "8px" }}
                >
                  <g>
                    <path d="M13.216 8.064c-.382-4.394-4.966-6.55-5.16-6.638a.974.974 0 0 0-.582-.078c-5.292.878-6.088 3.958-6.12 4.086a.99.99 0 0 0 .02.54c6.312 19.584 19.43 23.214 23.742 24.408.332.092.606.166.814.234a.99.99 0 0 0 .722-.042c.132-.06 3.248-1.528 4.01-6.316a.997.997 0 0 0-.096-.612c-.068-.132-1.698-3.234-6.218-4.33a.977.977 0 0 0-.884.21c-1.426 1.218-3.396 2.516-4.246 2.65-5.698-2.786-8.88-8.132-9-9.146-.07-.57 1.236-2.572 2.738-4.2a.998.998 0 0 0 .26-.766z"></path>
                  </g>
                </svg>
                + 52 222 279 6186
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-2 d-flex align-items-center justify-content-center gap-2"
        style={{ borderBottom: "1px solid #f9ede0" }}
      >
        © 2024 Copyright
        <a
          className="text-reset fw-bold"
          href="https://mdbootstrap.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          lamadriguera.toposfc.mx
        </a>
      </div>
    </MDBFooter>
  );
};

export default Footer;
