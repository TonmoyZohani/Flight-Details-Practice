import { useState } from "react";
import "./App.css";
import FlightDetailsSection from "./components/FlightDetailsSection";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import FlightMap from "./components/FlightMap";

const flightArrData = [
  {
    id: "flight1",
    brands: [
      {
        brandId: "BA001",
        brandName: "British Airways",
        agentPrice: 250,
        baggage: "20kg",
        structure: {
          type: "refundable",
          fee: 50,
          notes: "Full refund allowed",
        },
        nonStructure: {
          type: "meal",
          included: true,
          description: "Complimentary meal",
        },
      },
      {
        brandId: "BA002",
        brandName: "Qantas",
        agentPrice: 300,
        baggage: "25kg",
      },
      {
        brandId: "BA003",
        brandName: "Emirates",
        agentPrice: 350,
        baggage: "20kg",
        structure: {
          type: "priorityBoarding",
          fee: 30,
          notes: "Zone 1 boarding",
        },
        nonStructure: {
          type: "entertainment",
          included: false,
          description: "Premium entertainment package",
        },
      },
    ],
    priceBreakdown: {
      baseFare: 200,
      taxes: 50,
      fees: 30,
      total: 280,
    },
  },
  {
    id: "flight2",
    brands: [
      {
        brandId: "BA001",
        brandName: "British Airways", // Added brand name
        agentPrice: 400,
        baggage: "30kg",
        structure: {
          type: "baggage",
          fee: 0,
          notes: "Free checked baggage included",
        },
        nonStructure: {
          type: "wifi",
          included: true,
          description: "Free onboard wifi",
        },
      },
      {
        brandId: "BA004",
        brandName: "Singapore Airlines", // Added brand name
        agentPrice: 370,
        baggage: "15kg",
      },
    ],
    priceBreakdown: {
      baseFare: 350,
      taxes: 40,
      fees: 10,
      total: 400,
    },
  },
];

function App() {
  const [tabType, setTabType] = useState("selectFare");

  const handleTabChange = (event, newValue) => {
    setTabType(newValue);
  };

  return (
    <>
      <FlightMap />
      {/* <Typography>Map</Typography> */}
      {/* <Typography variant="h4" sx={{color:"navy"}}>
        Flight Tabs
      </Typography>

      <Tabs value={tabType} onChange={handleTabChange}>
        <Tab label="Select Fare" value="selectFare" />
        <Tab label="Seat Availability" value="seatAvailabilty" />
        <Tab label="Flight Details" value="flightDetails" />
      </Tabs>

      <Box mt={2}>
        <FlightDetailsSection flightArrData={flightArrData} tabType={tabType} />
      </Box> */}
    </>
  );
}

export default App;
