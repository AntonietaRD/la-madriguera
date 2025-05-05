import { Form } from "react-bootstrap";

type NumeroJugadoresSelectProps = {
  setNumeroJugadoresState: React.Dispatch<React.SetStateAction<number>>;
};

function NumeroJugadoresSelect({
  setNumeroJugadoresState,
}: NumeroJugadoresSelectProps) {
  const options = [];
  for (let i = 5; i <= 11; i++) {
    options.push(
      <option key={i} value={i}>
        {i}
      </option>,
    );
  }

  return (
    <Form.Select
      onChange={(e) => setNumeroJugadoresState(parseInt(e.target.value))}
    >
      <option>Seleccionar numero de jugadores</option>
      {options}
    </Form.Select>
  );
}

export default NumeroJugadoresSelect;
