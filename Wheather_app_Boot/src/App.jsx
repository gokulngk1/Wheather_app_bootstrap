import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchCity from "./components/SearchCity";
import WeatherCard from "./components/WeatherCard";
import WeatherChart from "./components/WeatherChart";
import { useWeather } from "./hooks/useWeather";

const App = () => {
  const [city, setCity] = useState("Chennai");
  const { data, loading, error } = useWeather(city);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <Container className="my-4 flex-grow-1">
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <SearchCity onSearch={(c) => setCity(c)} />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs={12} md={6} className="d-flex justify-content-center">
            {loading && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
            {error && <Alert variant="danger">{error}</Alert>}
            {!loading && !error && <WeatherCard data={data} />}
          </Col>

          <Col xs={12} md={6} className="d-flex justify-content-center">
            {!loading && !error && <WeatherChart data={data} />}
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default App;


