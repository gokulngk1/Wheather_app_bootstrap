import { useState, useEffect } from 'react'
import './App.css'
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import Footer from "./components/Footer";
import SearchCity from "./components/SearchCity";
import WeatherCard from "./components/WeatherCard";
import WeatherChart from "./components/WeatherChart";
import { useWeather } from './hooks/useWeather';

import { stateCities } from "./data/stateCities";

const App = () => {
  const [city, setCity] = useState("Chennai");
  const [coords, setCoords] = useState(null);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState(null);
  const [userState, setUserState] = useState("Tamil Nadu");

  const query = coords || city;
  const { data, loading, error } = useWeather(query);

  // ✅ Find state by city name
  const getStateByCity = (cityName) => {
    for (const [state, cities] of Object.entries(stateCities)) {
      if (cities.some(c => c.toLowerCase() === cityName.toLowerCase())) {
        return state;
      }
    }
    return "Tamil Nadu"; // Default fallback
  };

  // ✅ Reverse geocoding to detect user's state from coordinates
  const getStateFromCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=4e8a86f79d5484ae4cda8af753e9e97f`
      );
      const json = await res.json();
      return json[0]?.state || "Tamil Nadu";
    } catch {
      return "Tamil Nadu";
    }
  };

  // ✅ Update state when city changes
  useEffect(() => {
    if (city) {
      const detectedState = getStateByCity(city);
      setUserState(detectedState);
    }
  }, [city]);

  return (
    <div className="d-flex flex-column min-vh-100">

      <Container className="my-4 flex-grow-1">
        {/* Major Cities (dynamic) + Search (center) + Tamil Nadu (fixed right) */}
        <Row className="mb-4">
          {/* Left: Dynamic Major Cities for detected state */}
          <Col xs={12} md={3} className="mb-3 mb-md-0">
            {userState && stateCities[userState] && (
              <div className="text-center">
                <h6 className="fw-bold mb-3">Major Cities in {userState}</h6>
                <div className="d-flex flex-column gap-2">
                  {stateCities[userState].map((cityName) => (
                    <button
                      key={cityName}
                      className="btn btn-outline-primary w-100"
                      onClick={() => {
                        setCoords(null);
                        setCity(cityName);
                        setGeoError(null);
                      }}
                    >
                      {cityName}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Col>

          {/* Center: Search */}
          <Col xs={12} md={6}>
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
                  async (pos) => {
                    const { latitude: lat, longitude: lon } = pos.coords;

                    // ✅ detect the user's state
                    const st = await getStateFromCoords(lat, lon);
                    setUserState(st);

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

      {/* <Footer /> */}
    </div>
  );
};

export default App;
