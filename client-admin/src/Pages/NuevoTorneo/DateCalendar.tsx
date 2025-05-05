import { Form } from "react-bootstrap";

function DateCalendar({ name, onChange }) {
  return (
    <div>
      <Form.Control  style={{fontFamily: "Inter, sans-serif", fontOpticalSizing: "auto", fontWeight: "200", fontStyle: "normal", fontVariationSettings: "slnt 0", border:"none" , boxShadow:"0 4px 8px rgba(117, 117, 117, 0.2)" }} type="date" required name={name} onChange={onChange} />
      <Form.Control.Feedback type="invalid"
      style={{fontFamily: "Inter, sans-serif", fontOpticalSizing: "auto", fontWeight: "200", fontStyle: "normal", fontVariationSettings: "slnt 0"}}>
        {" "}
        Por favor, ingrese una fecha válida
      </Form.Control.Feedback>
    </div>
  );
}

export default DateCalendar;
