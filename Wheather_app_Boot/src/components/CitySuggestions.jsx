import { ListGroup } from "react-bootstrap";

export default function CitySuggestions({ cities, onSelect }) {
  if (!cities || cities.length === 0) return null;

  return (
    <ListGroup
      className="position-absolute w-100 mt-1 shadow"
      style={{ zIndex: 999, cursor: "pointer" }}
    >
      {cities.map((city, index) => (
        <ListGroup.Item key={index} action onClick={() => onSelect(city)}>
          {city}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
