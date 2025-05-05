import React, { useState } from "react";
import { Container, Row, Col, Image, Modal } from "react-bootstrap";
import "./galeria.css";
import config from "../../config.ts";

const images: string[] = [
  "/galeria1.jpg",
  "/galeria2.jpg",
  "/galeria3.jpg",
  "/galeria4.jpg",
  "/galeria5.jpg",
  "/galeria6.jpg",
  "/galeria7.jpg",
  "/galeria8.jpg",
  "/galeria9.jpg",
  "/galeria10.jpg",
  "/galeria11.jpg",
  "/galeria12.jpg",
  "/galeria13.jpg",
  "/galeria14.jpg",
  "/galeria15.jpg",
  "/galeria16.jpg",
];

const imagesWithBaseUrl = images.map(image => `${config.baseUrl}${image}`);

function Galeria() {
  const [lgShow, setShow] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [, setSelectedIndex] = useState<number>(0);

  const handleClose = () => setShow(false);
  const handleShow = (image: string, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    setShow(true);
  };

  return (
    <Container className="container1 m-0 d-flex flex-column gap-5 mb-5 ">
      <Row>
        <Col>
          <h1>Esta es nuestra cancha</h1>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={4} className="g-4">
        {imagesWithBaseUrl.map((image, idx) => (
          <Col key={idx}>
            <Image
              className="galeria"
              src={image}
              rounded
              fluid
              onClick={() => handleShow(image, idx)}
              style={{ cursor: "pointer" }} // Añade un cursor para indicar que la imagen es clicable
            />
          </Col>
        ))}
      </Row>

      <Modal
        size="lg"
        show={lgShow}
        onHide={handleClose}
        centered
        className="custom-modal"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image src={selectedImage} fluid />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Galeria;
