
import { useState, useEffect } from 'react';
import './App.css';
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";

import SearchCity from "./components/SearchCity";
import WeatherCard from "./components/WeatherCard";
import WeatherChart from "./components/WeatherChart";
import TopCities from "./components/TopCities";   // ✅ Added
import { useWeather } from './hooks/useWeather';
import { stateCities } from "./data/stateCities";

const App = () => {
  const [city, setCity] = useState("Chennai");
  const [coords, setCoords] = useState(null);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState(null);
  const [userState, setUserState] = useState("Tamil Nadu");

  // Weather API query input (either coordinates or city name)
  const query = coords || city;
  const { data, loading, error } = useWeather(query);

  /* ===============================
     DETECT STATE FROM CITY NAME
  =============================== */
  const getStateByCity = (cityName) => {
    for (const [state, cities] of Object.entries(stateCities)) {
      if (cities.some(c => c.toLowerCase() === cityName.toLowerCase())) {
        return state;
      }
    }
    return "Tamil Nadu";
  };

  /* ===============================
     DETECT STATE FROM COORDINATES
  =============================== */
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

  /* ===============================
     AUTO UPDATE STATE WHEN CITY CHANGES
  =============================== */
  useEffect(() => {
    if (city) {
      const detectedState = getStateByCity(city);
      setUserState(detectedState);
    }
  }, [city]);

  /* ===============================
       HANDLE CITY SELECT
  =============================== */
  const handleCitySelect = (c) => {
    setCoords(null);
    setCity(c);
    setGeoError(null);
  };

  return (
    <div className="msn-bg d-flex flex-column min-vh-100">

      <Container className="my-4">

        

        {/* ===================================
            TOP SECTION (MAJOR CITIES + SEARCH)
        ====================================== */}
   <Row className="mb-5 align-items-start justify-content-center gap-4">

  {/* LEFT — Weather Forecast Search Box */}
  <Col xs={12} md={5} lg={4}>
    <div className="search-wrapper msn-card">
      <SearchCity
        onSearch={(c) => handleCitySelect(c)}
        onLocate={() => {
          if (!navigator?.geolocation) {
            setGeoError("Geolocation not supported.");
            return;
          }

          setLocating(true);
          setGeoError(null);

          navigator.geolocation.getCurrentPosition(
            async (pos) => {
              const { latitude: lat, longitude: lon } = pos.coords;

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
            { timeout: 10000 }
          );
        }}
        locating={locating}
      />
    </div>
  </Col>

  {/* RIGHT — Major Cities */}
<Col sm={12} className="d-flex flex-row justify-content-start">
  <div className="major-cities-card msn-card p-4">
  <div className="cities-row">
  {["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"].map((c) => (
    <button
      key={c}
      className={`city-row-btn ${city === c ? "selected" : ""}`}
      onClick={() => handleCitySelect(c)}
    >
      {c}
    </button>
  ))}
</div>



  </div>
</Col>

</Row>


        {/* ===================================
            WEATHER CARD + CHART SECTION
        ====================================== */}
        <Row className="mt-4">

          {/* WEATHER CARD */}
          <Col xs={12} md={6} className="mb-4">
            {loading && (
              <div className="d-flex justify-content-center p-5">
                <Spinner animation="border" variant="light" />
              </div>
            )}

            {error && <Alert variant="danger">{error}</Alert>}
            {geoError && <Alert variant="warning">{geoError}</Alert>}

            {!loading && !error && (
              <div className="msn-card p-4 w-100">
                <WeatherCard data={data} />
              </div>
            )}
          </Col>

          {/* CHART */}
          <Col xs={12} md={6}>
            {!loading && !error && (
              <div className="msn-card p-4 w-100">
                <WeatherChart data={data} />
              </div>
            )}
          </Col>

        </Row>

      </Container>
    </div>
  );
};

export default App;
