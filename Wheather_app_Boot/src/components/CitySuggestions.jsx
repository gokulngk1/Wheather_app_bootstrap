import { ListGroup } from "react-bootstrap";

export default function CitySuggestions({ cities, onSelect }) {
  if (!cities || cities.length === 0) return null;

  const formatLabel = (item) => {
    if (typeof item === 'string') return item;
    // item from OpenWeatherMap geocoding
    const parts = [item.name];
    if (item.state) parts.push(item.state);
    if (item.country) parts.push(item.country);
    return parts.join(', ');
  };

  return (
    <ListGroup
      className="position-absolute w-100 mt-1 shadow"
      style={{ zIndex: 999, cursor: "pointer" }}
    >
      {cities.map((city, index) => (
        <ListGroup.Item key={index} action onClick={() => onSelect(city)}>
          {formatLabel(city)}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
