import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Card } from "react-bootstrap";
import { useTemp } from "../context/TempContext";

const WeatherChart = ({ data }) => {
  const { convertTemp, unit } = useTemp();

  if (!data) {
    return (
      <Card style={{ width: "100%", maxWidth: 480 }}>
        <Card.Body>
          <Card.Text className="text-center">Chart will appear here after search.</Card.Text>
        </Card.Body>
      </Card>
    );
  }

  // Build chart-friendly array (simple single-point chart of a few metrics)
  const chartData = [
    { name: `Temp (°${unit})`, value: convertTemp(data.main?.temp ?? 0) },
    { name: `Feels Like (°${unit})`, value: convertTemp(data.main?.feels_like ?? 0) },
    { name: "Humidity (%)", value: data.main?.humidity ?? 0 },
    { name: "Wind (m/s)", value: data.wind?.speed ?? 0 }
  ];

  return (
    <Card style={{ width: "100%", maxWidth: 480 }}>
      <Card.Body>
        <Card.Title className="text-center">Weather Metrics</Card.Title>
        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#007bff" strokeWidth={2} dot />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  );
};

export default WeatherChart;
