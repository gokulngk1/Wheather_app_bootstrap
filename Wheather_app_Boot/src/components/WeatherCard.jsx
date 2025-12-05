import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useTemp } from "../context/TempContext";

const WeatherCard = ({ data }) => {
  const { convertTemp, unit } = useTemp();

  if (!data) {
    return (
      <Card style={{ width: "20rem" }}>
        <Card.Body>
          <Card.Text className="text-center">Search for a city to see weather.</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  const { name, sys, main, weather, wind } = data;
  const icon = weather?.[0]?.icon;
  const description = weather?.[0]?.description || "";

  return (
    <Card style={{ width: "20rem" }}>
      <Card.Body className="text-center">
        <Card.Title>{name}{sys?.country ? `, ${sys.country}` : ""}</Card.Title>
        {icon && (
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            style={{ width: 100, height: 100 }}
          />
        )}
        <h2>{convertTemp(main?.temp)}°{unit}</h2>
        <Card.Subtitle className="mb-2 text-muted text-capitalize">{description}</Card.Subtitle>
      </Card.Body>

      <ListGroup variant="flush">
        <ListGroup.Item>Feels like: {convertTemp(main?.feels_like)}°{unit}</ListGroup.Item>
        <ListGroup.Item>Humidity: {main?.humidity}%</ListGroup.Item>
        <ListGroup.Item>Pressure: {main?.pressure} hPa</ListGroup.Item>
        <ListGroup.Item>Wind: {wind?.speed} m/s</ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default WeatherCard;
