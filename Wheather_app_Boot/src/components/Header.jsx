// import React from "react";
// import { Navbar, Container, Button } from "react-bootstrap";
// import { useTemp } from "../context/TempContext";

// const Header = () => {
//   const { unit, toggleUnit } = useTemp();

//   return (
//     <Navbar bg="primary" variant="dark" expand="md">
//       <Container className="d-flex justify-content-between align-items-center">
//         <Navbar.Brand href="#">🌤 Weather App</Navbar.Brand>
//         <Button 
//           variant="light" 
//           size="sm" 
//           onClick={toggleUnit}
//           title="Toggle temperature unit"
//         >
//           °{unit}
//         </Button>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;


import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useTemp } from "../context/TempContext";
import SearchCity from "./SearchCity";   // ⬅️ Add this import



const Header = ({ onSearch, onLocate, locating }) => {
  const { unit, toggleUnit } = useTemp();

  return (
    <Navbar bg="primary" variant="dark" expand="md" className="py-3">
      <Container className="d-flex flex-column align-items-center">

        <div className="d-flex w-100 justify-content-between align-items-center mb-3">
          <Navbar.Brand href="#" className="fw-bold fs-4">
            🌤 Weather App
          </Navbar.Brand>

          <Button 
            variant="light" 
            size="sm" 
            onClick={toggleUnit}
            title="Toggle temperature unit"
          >
            °{unit}
          </Button>
        </div>

        {/* ✅ Search bar moved INSIDE header */}
        <div className="w-100" style={{ maxWidth: "500px" }}>
          <SearchCity 
            onSearch={onSearch}
            onLocate={onLocate}
            locating={locating}
          />
        </div>

      </Container>
    </Navbar>
  );
};

export default Header;
