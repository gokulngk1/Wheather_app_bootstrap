import React from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { useWeather } from "../hooks/useWeather";

const majorCities = [
  "Chennai",
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Kolkata",
  "Hyderabad",
];

export default function TopCities({ onSelectCity }) {
  return (
    <div className="mt-4 mb-4">
      <h4 className="text-white mb-3" style={{ fontWeight: "600" }}>
        Major Cities
      </h4>

      <Row>
        {majorCities.map((city, index) => (
          <Col key={index} xs={6} sm={4} md={2} className="mb-3">
            <CityWeatherCard city={city} onSelectCity={onSelectCity} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

function CityWeatherCard({ city, onSelectCity }) {
  const { data, loading, error } = useWeather(city);

  return (
    <Card
      className="text-center p-2"
      style={{
        background: "rgba(255, 255, 255, 0.2)",
        border: "none",
        color: "white",
        backdropFilter: "blur(6px)",
        borderRadius: "16px",
        cursor: "pointer",
      }}
      onClick={() => onSelectCity(city)}
    >
      {loading && <Spinner animation="border" size="sm" />}
      {error && <div>Error</div>}
      {data && (
        <>
          <h6 style={{ fontSize: "14px", fontWeight: "600" }}>{city}</h6>
          <div style={{ fontSize: "20px", fontWeight: "700" }}>
            {Math.round(data.main.temp)}°C
          </div>
        </>
      )}
    </Card>
  );
}
