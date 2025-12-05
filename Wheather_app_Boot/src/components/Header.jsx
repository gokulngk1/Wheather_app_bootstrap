import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useTemp } from "../context/TempContext";

const Header = () => {
  const { unit, toggleUnit } = useTemp();

  return (
    <Navbar bg="primary" variant="dark" expand="md">
      <Container className="d-flex justify-content-between align-items-center">
        <Navbar.Brand href="#">🌤 Weather App</Navbar.Brand>
        <Button 
          variant="light" 
          size="sm" 
          onClick={toggleUnit}
          title="Toggle temperature unit"
        >
          °{unit}
        </Button>
      </Container>
    </Navbar>
  );
};

export default Header;
