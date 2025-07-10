import React, { useState } from "react";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const FlightDetailsSection = ({ flightArrData, tabType }) => {
  const allBrands = flightArrData.flatMap((flight) => flight.brands);
  const [selectedBrandId, setSelectedBrandId] = useState("BA001");

  const { data: selectedBrand } = useQuery({
    queryKey: ["brand", selectedBrandId],
    queryFn: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const foundBrand = allBrands.find(
            (brand) => brand.brandId === selectedBrandId
          );
          resolve(foundBrand || null);
        }, 0);
      });
    },
    initialData: () =>
      allBrands.find((brand) => brand.brandId === selectedBrandId) || null,
    staleTime: Infinity,
    enabled: !!selectedBrandId,
  });

  console.log("All Brands", allBrands);
  console.log("Selected Brand")

  return (
    <Box>
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

      {/* {selectedBrand ? (
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
      ) : (
        <p>Loading brand details...</p>
      )} */}
    </Box>
  );
};

export default FlightDetailsSection;
