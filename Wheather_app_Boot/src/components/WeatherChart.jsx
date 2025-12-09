import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { Card } from "react-bootstrap";
import { useTemp } from "../context/TempContext";

const WeatherChart = ({ data }) => {
  const { convertTemp, unit } = useTemp();

  if (!data) {
    return (
      <Card
        style={{
          width: "100%",
          maxWidth: 480,
          background: "rgba(255,255,255,0.25)",
          backdropFilter: "blur(12px)",
          borderRadius: "20px",
          border: "1px solid rgba(255,255,255,0.3)",
          color: "#fff",
        }}
      >
        <Card.Body>
          <Card.Text className="text-center">
            Chart will appear here after search.
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  const chartData = [
    { name: `Temp (°${unit})`, value: convertTemp(data.main?.temp ?? 0) },
    { name: `Feels Like (°${unit})`, value: convertTemp(data.main?.feels_like ?? 0) },
    { name: "Humidity (%)", value: data.main?.humidity ?? 0 },
    { name: "Wind (m/s)", value: data.wind?.speed ?? 0 }
  ];

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: 480,
        background: "rgba(255,255,255,0.20)",
        backdropFilter: "blur(15px)",
        borderRadius: "20px",
        border: "1px solid rgba(255,255,255,0.3)",
        color: "#fff",
        padding: "10px",
      }}
    >
      <Card.Body>
        <Card.Title
          className="text-center"
          style={{ fontSize: "1.3rem", fontWeight: 600, color: "#fff" }}
        >
          Weather Metrics
        </Card.Title>

        <div style={{ width: "100%", height: 280 }}>
          <ResponsiveContainer>
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
            >
              <CartesianGrid stroke="rgba(255,255,255,0.2)" strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#fff", fontSize: 12 }}
                tickLine={{ stroke: "#fff" }}
              />
              <YAxis
                tick={{ fill: "#fff", fontSize: 12 }}
                tickLine={{ stroke: "#fff" }}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(0,0,0,0.6)",
                  borderRadius: "10px",
                  border: "none",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4db8ff"
                strokeWidth={3}
                dot={{ stroke: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card.Body>
    </Card>
  );
};

export default WeatherChart;
