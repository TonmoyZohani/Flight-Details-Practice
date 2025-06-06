import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

const FlightDetailsSection = ({ flightArrData, tabType }) => {
  // Extract all brands from all flights
  const allBrands = flightArrData.flatMap(flight => flight.brands);
  
  // State to store the selected brand
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedBrandId, setSelectedBrandId] = useState("BA001"); // Default brand ID

  useEffect(() => {
    // Find the brand in the flightArrData (no need for fetch if data is already in props)
    const foundBrand = allBrands.find(brand => brand.brandId === selectedBrandId);
    setSelectedBrand(foundBrand);
  }, [selectedBrandId, flightArrData]);

  console.log("All brands:", allBrands);
  console.log("Selected brand:", selectedBrand);
  console.log("Tab Type:", tabType);

  return (
    <Box>
      {/* Brand selector dropdown */}
      <select 
        value={selectedBrandId}
        onChange={(e) => setSelectedBrandId(e.target.value)}
        style={{ marginBottom: "20px" }}
      >
        {allBrands.map((brand) => (
          <option key={brand.brandId} value={brand.brandId}>
            {brand.brandName} ({brand.brandId})
          </option>
        ))}
      </select>

      {/* Display brand details */}
      {selectedBrand && (
        <div>
          <h2>{selectedBrand.brandName} Details</h2>
          <p>Price: ${selectedBrand.agentPrice}</p>
          <p>Baggage: {selectedBrand.baggage}</p>
          
          <h3>Structure:</h3>
          {selectedBrand.structure && Object.keys(selectedBrand.structure).length > 0 ? (
            <pre>{JSON.stringify(selectedBrand.structure, null, 2)}</pre>
          ) : (
            <p>No structure details available</p>
          )}

          <h3>Non-Structure:</h3>
          {selectedBrand.nonStructure && Object.keys(selectedBrand.nonStructure).length > 0 ? (
            <pre>{JSON.stringify(selectedBrand.nonStructure, null, 2)}</pre>
          ) : (
            <p>No non-structure details available</p>
          )}
        </div>
      )}
    </Box>
  );
};

export default FlightDetailsSection;