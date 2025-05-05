import styles from "./Login.module.css";
import { Button, Form } from "react-bootstrap";
import { FormEvent, useState } from "react";
import axios from "axios";
import config from "../../config.ts";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${config.apiUrl}/access/login`,
        {
          username,
          password,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        },
      );

      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (err) {
      setError("Credenciales invalidas");
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.headerWrapper}>
          <div className={styles.overlayImageContainer}>
            <img
              src="src/assets/logo.png"
              className={styles.overlayImage}
              alt="Overlay Image"
            />
          </div>
        </div>

        <h2>Panel de control del administrador </h2>
        <Form
          style={{ width: "40%" }}
          className={`${styles.formContainer} d-flex flex-column `}
          onSubmit={handleLogin}
        >
          <Form.Group className={styles.formGroup}>
            <Form.Label className="text-center w-100 my-3">
              Ingresa tu nombre de usuario
            </Form.Label>
            <Form.Control
              style={{
                fontFamily: "Inter, sans-serif",
                fontOpticalSizing: "auto",
                fontWeight: "200",
                fontStyle: "normal",
                fontVariationSettings: "slnt 0",
                border: "none",
                boxShadow: "0 4px 8px rgba(117, 117, 117, 0.2)",
              }}
              type="text"
              placeholder="Escriba aquí su nombre de usuario"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, escriba un nombre de usuario
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className={styles.formGroup}>
            <Form.Label className="text-center w-100 my-3">
              Ingresa tu contraseña
            </Form.Label>
            <Form.Control
              style={{
                fontFamily: "Inter, sans-serif",
                fontOpticalSizing: "auto",
                fontWeight: "200",
                fontStyle: "normal",
                fontVariationSettings: "slnt 0",
                border: "none",
                boxShadow: "0 4px 8px rgba(117, 117, 117, 0.2)",
              }}
              type="password"
              placeholder="Contraseña"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Por favor, escriba una contraseña
            </Form.Control.Feedback>
          </Form.Group>
          {error && <p className={"my-3"}>{error}</p>}
          <Button
            className="my-5"
            variant="primary"
            type="submit"
            style={{
              width: "15vw",
              height: "5vh",
              fontFamily: "Inter , sans-serif",
              fontWeight: "400",
              fontSize: "1.2em",
              boxShadow: "0 4px 8px rgba(117, 117, 117, 0.2)",
            }}
          >
            Iniciar sesión
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
