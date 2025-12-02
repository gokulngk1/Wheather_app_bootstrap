import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

const SearchCity = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const trimmed = city.trim();
    if (trimmed) {
      onSearch(trimmed);
      setCity("");
    }
  };

  return (
    <Form onSubmit={submit}>
      <InputGroup>
        <Form.Control
          placeholder="Enter city name (e.g., London)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          aria-label="City name"
        />
        <Button type="submit" variant="primary">Search</Button>
      </InputGroup>
    </Form>
  );
};

export default SearchCity;
