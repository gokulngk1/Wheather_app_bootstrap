import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { Search, GeoAltFill } from "react-bootstrap-icons";
import { useTemp } from "../context/TempContext";
import CitySuggestions from "./CitySuggestions";

const SearchCity = ({ onSearch, onLocate, locating }) => {
  const [input, setInput] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);

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

    if (!value.trim()) {
      setFilteredCities([]);
      return;
    }

    const match = cityList.filter((city) =>
      city.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredCities(match);
  };

  // ✔ When selecting city from suggestions
  const handleSelect = (city) => {
    setInput(city);
    setFilteredCities([]);
    onSearch(city);
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
        <Button variant="primary" onClick={() => onSearch(input)} aria-label="Search">
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

      {/* 🔽 City Suggestions Dropdown */}
      <CitySuggestions cities={filteredCities} onSelect={handleSelect} />
    </div>
  );
};

export default SearchCity;
