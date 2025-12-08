import { useState, useRef } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { Search, GeoAltFill } from "react-bootstrap-icons";
import { useTemp } from "../context/TempContext";
import CitySuggestions from "./CitySuggestions";

const SearchCity = ({ onSearch, onLocate, locating }) => {
  const [input, setInput] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const [geoSuggestions, setGeoSuggestions] = useState([]);
  const geoTimer = useRef(null);

  const { unit, toggleUnit } = useTemp();

  const cityList = [
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Bangalore",
    "Hyderabad",
    "Mumbai",
    "Delhi",
    "Kolkata",
    "Pune",
    "Ahmedabad"
  ];

  // 🔍 FILTER CITIES WHILE TYPING
  const handleInput = (value) => {
    setInput(value);

    // clear previous lists
    setFilteredCities([]);
    setGeoSuggestions([]);

    if (!value.trim()) return;

    // local suggestions first
    const match = cityList.filter((city) =>
      city.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCities(match);

    // debounce geo lookup for worldwide suggestions
    if (geoTimer.current) clearTimeout(geoTimer.current);
    geoTimer.current = setTimeout(async () => {
      try {
        const API_KEY = "4e8a86f79d5484ae4cda8af753e9e97f";
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(value)}&limit=6&appid=${API_KEY}`
        );
        if (!res.ok) return;
        const json = await res.json();
        if (json && json.length) {
          setGeoSuggestions(json);
        }
      } catch (e) {
        // ignore geo errors silently
      }
    }, 350);
  };

  // ✔ When selecting city from suggestions
  const handleSelect = (city) => {
    // city can be a string (local) or object (geo result)
    if (typeof city === 'string') {
      setInput(city);
      setFilteredCities([]);
      onSearch(city);
    } else if (city && city.lat != null && city.lon != null) {
      const label = [city.name, city.state, city.country].filter(Boolean).join(', ');
      setInput(label);
      setGeoSuggestions([]);
      // pass coordinates to onSearch so App uses coords
      onSearch({ lat: city.lat, lon: city.lon });
    }
  };

  return (
    <div className="position-relative searchcity-root">

      {/* Header inside SearchCity: brand + unit toggle */}
      <div className="d-flex w-100 justify-content-between align-items-center mb-3" style={{ maxWidth: 720, margin: '0 auto' }}>
        <div className="fw-bold fs-4">🌤 Weather App</div>
        <Button variant="light" size="sm" onClick={toggleUnit} title="Toggle temperature unit">°{unit}</Button>
      </div>

      <InputGroup className="input-group-responsive">
        {/* Input Box */}
        <Form.Control
          type="text"
          placeholder={`Search city (results in °${unit})`}
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          aria-label="City name"
        />

        {/* Unit Display */}
        <InputGroup.Text aria-hidden>°{unit}</InputGroup.Text>

        {/* Search Button */}
        <Button variant="primary" onClick={() => {
          if (input.trim()) {
            onSearch(input);
            setInput("");
            setFilteredCities([]);
          }
        }} aria-label="Search">
          <span className="d-none d-sm-inline">Search</span>
          <Search className="d-inline d-sm-none" />
        </Button>

        {/* Locate Button */}
        <Button
          variant="info"
          disabled={locating}
          onClick={onLocate}
          aria-label="Use my location"
        >
          <span className="d-none d-sm-inline">
            {locating ? "Locating..." : "Locate"}
          </span>
          <GeoAltFill className="d-inline d-sm-none" />
        </Button>
      </InputGroup>

      {/* 🔽 City Suggestions Dropdown (local + worldwide) */}
      <CitySuggestions cities={[...filteredCities, ...geoSuggestions]} onSelect={handleSelect} />
    </div>
  );
};

export default SearchCity;
