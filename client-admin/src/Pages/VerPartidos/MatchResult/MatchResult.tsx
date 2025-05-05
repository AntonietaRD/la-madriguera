import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { Partido } from "../../../types/types.ts";

const MatchResult = ({
  timestamp_inicio,
  equipo_1,
  goles_equipo_1,
  equipo_2,
  goles_equipo_2,
}: Partido) => {
  return (
    <Card className="mb-3 w-50 shadow rounded-3">
      <Card.Body>
        <Container>
          <Row>
            <Col md={3} className="d-flex align-items-center">
              <Card.Text>{timestamp_inicio}</Card.Text>
            </Col>
            <Col md={9}>
              <Row>
                <Col md={5} className="text-right">
                  <Card.Text className="fw-bold">{equipo_1}</Card.Text>
                </Col>
                <Col md={2} className="text-center">
                  <Card.Text>
                    {goles_equipo_1} - {goles_equipo_2}
                  </Card.Text>
                </Col>
                <Col md={5}>
                  <Card.Text className="fw-bold">{equipo_2}</Card.Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default MatchResult;
