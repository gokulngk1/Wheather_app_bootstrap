// import { useState } from 'react'
// import './App.css'
// import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import SearchCity from "./components/SearchCity";
// import WeatherCard from "./components/WeatherCard";
// import WeatherChart from "./components/WeatherChart";
// import { useWeather } from './hooks/useWeather';
// const App = () => {
//   const [city, setCity] = useState("Chennai");
//   const [coords, setCoords] = useState(null);
//   const [locating, setLocating] = useState(false);
//   const [geoError, setGeoError] = useState(null);

 
//    const query = coords || city;
//   const { data, loading, error } = useWeather(query);

//   return (
//     <div className="d-flex flex-column min-vh-100">
//       <Header />

//       <Container className="my-4 flex-grow-1">
//         <Row className="justify-content-center">
//           <Col xs={12} md={8}>
//             <SearchCity
//               onSearch={(c) => {
//                 setCoords(null);
//                 setCity(c);
//                 setGeoError(null);
//               }}
//               onLocate={() => {
//                 if (!navigator?.geolocation) {
//                   setGeoError("Geolocation not supported in this browser.");
//                   return;
//                 }

//                 setLocating(true);
//                 setGeoError(null);

//                 navigator.geolocation.getCurrentPosition(
//                   (pos) => {
//                     const { latitude: lat, longitude: lon } = pos.coords;
//                     setCoords({ lat, lon });
//                     setCity("");
//                     setLocating(false);
//                   },
//                   (err) => {
//                     setGeoError(err.message || "Failed to get location");
//                     setLocating(false);
//                   },
//                   { enableHighAccuracy: false, timeout: 10000 }
//                 );
//               }}
//               locating={locating}
//             />
//           </Col>
//         </Row>

//         <Row className="mt-3">
//           <Col xs={12} md={6} className="d-flex justify-content-center">
//             {loading && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
//             {error && <Alert variant="danger">{error}</Alert>}
//             {geoError && <Alert variant="warning">{geoError}</Alert>}
//             {!loading && !error && <WeatherCard data={data} />}
//           </Col>

//           <Col xs={12} md={6} className="d-flex justify-content-center">
//             {!loading && !error && <WeatherChart data={data} />}
//           </Col>
//         </Row>
//       </Container>

//       {/* <Footer /> */}
//     </div>
//   );
// };

// export default App;



import { useState } from 'react'
import './App.css'
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import Footer from "./components/Footer";
import SearchCity from "./components/SearchCity";
import WeatherCard from "./components/WeatherCard";
import WeatherChart from "./components/WeatherChart";
import { useWeather } from './hooks/useWeather';

import { stateCities } from "./data/stateCities";  // ✅ NEW

const App = () => {
  const [city, setCity] = useState("Chennai");
  const [coords, setCoords] = useState(null);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState(null);

  const [userState, setUserState] = useState(""); // ✅ NEW

  const query = coords || city;
  const { data, loading, error } = useWeather(query);

  // ✅ Reverse geocoding to detect user's state
  const getStateFromCoords = async (lat, lon) => {
    try {
      const res = await fetch(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=4e8a86f79d5484ae4cda8af753e9e97f`
      );
      const json = await res.json();
      return json[0]?.state || "";
    } catch {
      return "";
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">

      <Container className="my-4 flex-grow-1">
        {/* Header + Search + Major Cities Row */}
        <Row className="mb-4">
          {/* Left: Major Cities */}
          <Col xs={12} md={4} className="mb-3 mb-md-0">
            {stateCities["Tamil Nadu"] && (
              <div className="text-center">
                <h5 className="fw-bold mb-3">Major Cities in Tamil Nadu</h5>
                <div className="d-flex flex-column gap-2">
                  {stateCities["Tamil Nadu"].map((cityName) => (
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

          {/* Right: Search */}
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
