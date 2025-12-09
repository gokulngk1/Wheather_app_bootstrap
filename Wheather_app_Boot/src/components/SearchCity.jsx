// // import { useState, useRef } from "react";
// // import { Form, InputGroup, Button } from "react-bootstrap";
// // import { Search, GeoAltFill } from "react-bootstrap-icons";
// // import { useTemp } from "../context/TempContext";
// // import CitySuggestions from "./CitySuggestions";

// // const SearchCity = ({ onSearch, onLocate, locating }) => {
// //   const [input, setInput] = useState("");
// //   const [filteredCities, setFilteredCities] = useState([]);
// //   const [geoSuggestions, setGeoSuggestions] = useState([]);
// //   const geoTimer = useRef(null);

// //   const { unit, toggleUnit } = useTemp();

// //   const cityList = [
// //     "Chennai",
// //     "Coimbatore",
// //     "Madurai",
// //     "Bangalore",
// //     "Hyderabad",
// //     "Mumbai",
// //     "Delhi",
// //     "Kolkata",
// //     "Pune",
// //     "Ahmedabad"
// //   ];

// //   // 🔍 FILTER CITIES WHILE TYPING
// //   const handleInput = (value) => {
// //     setInput(value);

// //     // clear previous lists
// //     setFilteredCities([]);
// //     setGeoSuggestions([]);

// //     if (!value.trim()) return;

// //     // local suggestions first
// //     const match = cityList.filter((city) =>
// //       city.toLowerCase().includes(value.toLowerCase())
// //     );
// //     setFilteredCities(match);

// //     // debounce geo lookup for worldwide suggestions
// //     if (geoTimer.current) clearTimeout(geoTimer.current);
// //     geoTimer.current = setTimeout(async () => {
// //       try {
// //         const API_KEY = "4e8a86f79d5484ae4cda8af753e9e97f";
// //         const res = await fetch(
// //           `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(value)}&limit=6&appid=${API_KEY}`
// //         );
// //         if (!res.ok) return;
// //         const json = await res.json();
// //         if (json && json.length) {
// //           setGeoSuggestions(json);
// //         }
// //       } catch (e) {
// //         // ignore geo errors silently
// //       }
// //     }, 350);
// //   };

// //   // ✔ When selecting city from suggestions
// //   const handleSelect = (city) => {
// //     // city can be a string (local) or object (geo result)
// //     if (typeof city === 'string') {
// //       setInput(city);
// //       setFilteredCities([]);
// //       onSearch(city);
// //     } else if (city && city.lat != null && city.lon != null) {
// //       const label = [city.name, city.state, city.country].filter(Boolean).join(', ');
// //       setInput(label);
// //       setGeoSuggestions([]);
// //       // pass coordinates to onSearch so App uses coords
// //       onSearch({ lat: city.lat, lon: city.lon });
// //     }
// //   };

// //   return (
// //     <div className="position-relative searchcity-root">

// //       {/* Header inside SearchCity: brand + unit toggle */}
// //       <div className="d-flex w-100 justify-content-between align-items-center mb-3" style={{ maxWidth: 720, margin: '0 auto' }}>
// //         <div className="fw-bold fs-4">🌤 Weather App</div>
// //         <Button variant="light" size="sm" onClick={toggleUnit} title="Toggle temperature unit">°{unit}</Button>
// //       </div>

// //       <InputGroup className="input-group-responsive">
// //         {/* Input Box */}
// //         <Form.Control
// //           type="text"
// //           placeholder={`Search city (results in °${unit})`}
// //           value={input}
// //           onChange={(e) => handleInput(e.target.value)}
// //           aria-label="City name"
// //         />

// //         {/* Unit Display */}
// //         <InputGroup.Text aria-hidden>°{unit}</InputGroup.Text>

// //         {/* Search Button */}
// //         <Button variant="primary" onClick={() => {
// //           if (input.trim()) {
// //             onSearch(input);
// //             setInput("");
// //             setFilteredCities([]);
// //           }
// //         }} aria-label="Search">
// //           <span className="d-none d-sm-inline">Search</span>
// //           <Search className="d-inline d-sm-none" />
// //         </Button>

// //         {/* Locate Button */}
// //         <Button
// //           variant="info"
// //           disabled={locating}
// //           onClick={onLocate}
// //           aria-label="Use my location"
// //         >
// //           <span className="d-none d-sm-inline">
// //             {locating ? "Locating..." : "Locate"}
// //           </span>
// //           <GeoAltFill className="d-inline d-sm-none" />
// //         </Button>
// //       </InputGroup>

// //       {/* 🔽 City Suggestions Dropdown (local + worldwide) */}
// //       <CitySuggestions cities={[...filteredCities, ...geoSuggestions]} onSelect={handleSelect} />
// //     </div>
// //   );
// // };

// // export default SearchCity;



// import { useState, useRef } from "react";
// import { Form, InputGroup, Button } from "react-bootstrap";
// import { Search, GeoAltFill } from "react-bootstrap-icons";
// import { useTemp } from "../context/TempContext";
// import CitySuggestions from "./CitySuggestions";

// const SearchCity = ({ onSearch, onLocate, locating }) => {
//   const [input, setInput] = useState("");
//   const [filteredCities, setFilteredCities] = useState([]);
//   const [geoSuggestions, setGeoSuggestions] = useState([]);
//   const geoTimer = useRef(null);

//   const { unit, toggleUnit } = useTemp();

//   const cityList = [
//     "Chennai",
//     "Coimbatore",
//     "Madurai",
//     "Bangalore",
//     "Hyderabad",
//     "Mumbai",
//     "Delhi",
//     "Kolkata",
//     "Pune",
//     "Ahmedabad",
//   ];

//   // 🔍 FILTER CITIES WHILE TYPING
//   const handleInput = (value) => {
//     setInput(value);

//     setFilteredCities([]);
//     setGeoSuggestions([]);

//     if (!value.trim()) return;

//     // Local city matches
//     const match = cityList.filter((city) =>
//       city.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredCities(match);

//     // Debounced geo suggestions
//     if (geoTimer.current) clearTimeout(geoTimer.current);
//     geoTimer.current = setTimeout(async () => {
//       try {
//         const API_KEY = "4e8a86f79d5484ae4cda8af753e9e97f";
//         const res = await fetch(
//           `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
//             value
//           )}&limit=6&appid=${API_KEY}`
//         );
//         const json = await res.json();
//         if (json.length) setGeoSuggestions(json);
//       } catch {}
//     }, 300);
//   };

//   // ✔ When user selects a suggestion
//   const handleSelect = (city) => {
//     if (typeof city === "string") {
//       setInput(city);
//       setFilteredCities([]);
//       onSearch(city);
//     } else {
//       const label = [city.name, city.state, city.country]
//         .filter(Boolean)
//         .join(", ");
//       setInput(label);
//       setGeoSuggestions([]);
//       onSearch({ lat: city.lat, lon: city.lon });
//     }
//   };

//   return (
//     <div className="searchcity-root position-relative">

//       {/* 🌤 Brand Header */}
//       <div
//         className="d-flex justify-content-between align-items-center mb-4"
//         style={{ maxWidth: 780, margin: "0 auto" }}
//       >
//         <div className="fw-bold fs-3" style={{ letterSpacing: "0.5px" }}>
//           🌥 Weather Forecast
//         </div>

//         {/* Unit Toggle */}
//         <Button
//           variant="light"
//           size="sm"
//           onClick={toggleUnit}
//           className="rounded-pill px-3 shadow-sm"
//         >
//           °{unit}
//         </Button>
//       </div>

//       {/* 🔎 Search Bar */}
//       <InputGroup
//         className="shadow-lg rounded-pill overflow-hidden"
//         style={{
//           maxWidth: 780,
//           margin: "0 auto",
//           background: "rgba(255,255,255,0.25)",
//           backdropFilter: "blur(6px)",
//         }}
//       >
//         <Form.Control
//           type="text"
//           placeholder={`Search city (°${unit})`}
//           value={input}
//           onChange={(e) => handleInput(e.target.value)}
//           style={{
//             background: "rgba(255,255,255,0.15)",
//             border: "none",
//             color: "#fff",
//           }}
//           className="py-3 fs-6"
//         />

//         <InputGroup.Text
//           style={{
//             background: "transparent",
//             color: "white",
//             border: "none",
//             fontWeight: "bold",
//           }}
//         >
//           °{unit}
//         </InputGroup.Text>

//         {/* Search Button */}
//         <Button
//           variant="primary"
//           onClick={() => {
//             if (input.trim()) {
//               onSearch(input);
//               setInput("");
//               setFilteredCities([]);
//             }
//           }}
//           className="px-4"
//         >
//           <Search />
//         </Button>

//         {/* GPS Button */}
//         <Button
//           variant="info"
//           disabled={locating}
//           onClick={onLocate}
//           className="px-4"
//         >
//           <GeoAltFill />
//         </Button>
//       </InputGroup>

//       {/* Suggestions */}
//       <CitySuggestions
//         cities={[...filteredCities, ...geoSuggestions]}
//         onSelect={handleSelect}
//       />
//     </div>
//   );
// };

// export default SearchCity;


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
    "Chennai", "Coimbatore", "Madurai", "Bangalore",
    "Hyderabad", "Mumbai", "Delhi", "Kolkata",
    "Pune", "Ahmedabad"
  ];

  // 🔍 Live city filtering
  const handleInput = (value) => {
    setInput(value);

    setFilteredCities([]);
    setGeoSuggestions([]);

    if (!value.trim()) return;

    const match = cityList.filter((city) =>
      city.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCities(match);

    // Geo API debounced lookup
    if (geoTimer.current) clearTimeout(geoTimer.current);

    geoTimer.current = setTimeout(async () => {
      try {
        const API_KEY = "4e8a86f79d5484ae4cda8af753e9e97f";
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
            value
          )}&limit=6&appid=${API_KEY}`
        );
        const json = await res.json();
        if (json.length) setGeoSuggestions(json);
      } catch {}
    }, 320);
  };

  // ✔ Suggestion selection
  const handleSelect = (city) => {
    if (typeof city === "string") {
      setInput(city);
      setFilteredCities([]);
      onSearch(city);
      return;
    }

    const label = [city.name, city.state, city.country]
      .filter(Boolean)
      .join(", ");

    setInput(label);
    setGeoSuggestions([]);
    onSearch({ lat: city.lat, lon: city.lon });
  };

  return (
    <div className="searchcity-root position-relative">

      {/* Header */}
      <div
        className="d-flex justify-content-between align-items-center mb-4"
        style={{ maxWidth: 780, margin: "0 auto" }}
      >
        <div className="fw-bold fs-3 text-white" style={{ letterSpacing: "0.4px" }}>
          🌥 Weather Forecast
        </div>

        {/* Unit Toggle */}
        <Button
          variant="light"
          size="sm"
          onClick={toggleUnit}
          className="rounded-pill px-3 shadow-sm"
        >
          °{unit}
        </Button>
      </div>

      {/* Search Bar */}
      <InputGroup
        className="shadow-lg rounded-pill overflow-hidden"
        style={{
          maxWidth: 780,
          margin: "0 auto",
          background: "rgba(255, 255, 255, 0.20)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <Form.Control
          type="text"
          placeholder={`Search city (°${unit})`}
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          className="py-3 fs-6"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            border: "none",
            color: "#fff",
            fontSize: "1rem",
          }}
        />

        <InputGroup.Text
          style={{
            background: "transparent",
            color: "#fff",
            border: "none",
            fontWeight: 600,
          }}
        >
          °{unit}
        </InputGroup.Text>

        {/* Search Button */}
        <Button
          variant="primary"
          className="px-4"
          onClick={() => {
            if (input.trim()) {
              onSearch(input);
              setInput("");
              setFilteredCities([]);
            }
          }}
        >
          <Search />
        </Button>

        {/* Locate Button */}
        <Button
          variant="info"
          disabled={locating}
          onClick={onLocate}
          className="px-4"
        >
          <GeoAltFill />
        </Button>
      </InputGroup>

      {/* Suggestions List */}
      <CitySuggestions
        cities={[...filteredCities, ...geoSuggestions]}
        onSelect={handleSelect}
      />
    </div>
  );
};

export default SearchCity;
