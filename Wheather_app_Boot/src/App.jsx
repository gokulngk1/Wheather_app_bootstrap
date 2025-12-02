import { useState } from 'react'
// removed unused logo imports
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
  const [coords, setCoords] = useState(null);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState(null);

  // prefer coords if available; otherwise fall back to city string
  const query = coords || city;
  const { data, loading, error } = useWeather(query);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <Container className="my-4 flex-grow-1">
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <SearchCity
              onSearch={(c) => {
                setCoords(null);
                setCity(c);
                setGeoError(null);
              }}
              onLocate={() => {
                if (!navigator?.geolocation) {
                  setGeoError("Geolocation not supported in this browser.");
                  return;
                }

                setLocating(true);
                setGeoError(null);

                navigator.geolocation.getCurrentPosition(
                  (pos) => {
                    const { latitude: lat, longitude: lon } = pos.coords;
                    setCoords({ lat, lon });
                    setCity("");
                    setLocating(false);
                  },
                  (err) => {
                    setGeoError(err.message || "Failed to get location");
                    setLocating(false);
                  },
                  { enableHighAccuracy: false, timeout: 10000 }
                );
              }}
              locating={locating}
            />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs={12} md={6} className="d-flex justify-content-center">
            {loading && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
            {error && <Alert variant="danger">{error}</Alert>}
            {geoError && <Alert variant="warning">{geoError}</Alert>}
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


