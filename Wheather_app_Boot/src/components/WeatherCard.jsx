import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useTemp } from "../context/TempContext";

const WeatherCard = ({ data }) => {
  const { convertTemp, unit } = useTemp();

  if (!data) {
    return (
      <Card
        style={{
          width: "20rem",
          background: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <Card.Body>
          <Card.Text className="text-center" style={{ color: "#fff" }}>
            Search for a city to see weather.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  const { name, sys, main, weather, wind } = data;
  const icon = weather?.[0]?.icon;
  const description = weather?.[0]?.description || "";

  return (
    <Card
      style={{
        width: "20rem",
        background: "rgba(255,255,255,0.20)",
        backdropFilter: "blur(12px)",
        borderRadius: "20px",
        border: "1px solid rgba(255,255,255,0.3)",
        color: "#fff",
      }}
    >
      <Card.Body className="text-center">
        {/* City Name */}
        <Card.Title style={{ fontSize: "1.4rem", fontWeight: 600 }}>
          {name}
          {sys?.country ? `, ${sys.country}` : ""}
        </Card.Title>

        {/* Weather Icon */}
        {icon && (
          <img
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            style={{ width: 110, height: 110 }}
          />
        )}

        {/* Temperature */}
        <h2 style={{ fontSize: "2.8rem", margin: "10px 0" }}>
          {convertTemp(main?.temp)}°{unit}
        </h2>

        {/* Description */}
        <Card.Subtitle
          className="mb-3 text-capitalize"
          style={{ color: "#e3e3e3", fontSize: "1rem" }}
        >
          {description}
        </Card.Subtitle>
      </Card.Body>

      {/* Weather Details */}
      <ListGroup
        variant="flush"
        style={{
          background: "transparent",
          color: "#fff",
          borderRadius: "10px",
        }}
      >
        <ListGroup.Item style={listItemStyle}>
          Feels like: {convertTemp(main?.feels_like)}°{unit}
        </ListGroup.Item>

        <ListGroup.Item style={listItemStyle}>
          Humidity: {main?.humidity}%
        </ListGroup.Item>

        <ListGroup.Item style={listItemStyle}>
          Pressure: {main?.pressure} hPa
        </ListGroup.Item>

        <ListGroup.Item style={listItemStyle}>
          Wind: {wind?.speed} m/s
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

// Reusable style for list items
const listItemStyle = {
  background: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(5px)",
  border: "none",
  color: "#fff",
  marginBottom: "2px",
  fontSize: "0.95rem",
  borderRadius: "8px",
};

export default WeatherCard;
