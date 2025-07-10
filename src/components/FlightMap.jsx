import React, { useEffect, useState } from "react";
import { SwipeableDrawer, Button, Box, Typography } from "@mui/material";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { trackingData } from "../utils/trackingData";
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 23.8103, // Example: Dhaka (Hazrat Shahjalal Intl Airport)
  lng: 90.4125
};


const FlightMap = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [flatTracking, setFlatTracking] = useState([]);
  const [destinationData, setDestinationData] = useState([]);
  const [trackerMap, setTrackerMap] = useState(null);

  // Extract and flatten tracking data
  useEffect(() => {
    if (trackingData && Object.keys(trackingData).length !== 0) {
      const flattened = [];

      Object.values(trackingData).forEach((flightGroupList) => {
        if (Array.isArray(flightGroupList)) {
          flightGroupList.forEach((group) => {
            if (Array.isArray(group)) {
              flattened.push(...group);
            }
          });
        }
      });

      setFlatTracking(flattened);
    }
  }, [trackingData]);

  // Open drawer with map data
  const handleOpenDrawer = (flatData) => {
    if (!flatData?.departure || !flatData?.arrival) return;

    setOpenDrawer(true);
    setTrackerMap(flatData);

    setDestinationData([
      {
        id: "departure",
        label: flatData.departure.airportName || flatData.departure.airport,
        lat: Number(flatData.departure.latitude),
        lng: Number(flatData.departure.longitude),
      },
      {
        id: "arrival",
        label: flatData.arrival.airportName || flatData.arrival.airport,
        lat: Number(flatData.arrival.latitude),
        lng: Number(flatData.arrival.longitude),
      },
    ]);
  };

  return (
    <>
      {/* Example: Trigger from first flight */}
      {flatTracking.length > 0 && (
        <Button
          variant="contained"
          onClick={() => handleOpenDrawer(flatTracking[0])}
        >
          Show Flight Map
        </Button>
      )}

      <SwipeableDrawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        PaperProps={{
          sx: { width: "50vw" },
        }}
      >
        <Box sx={{ height: "100%", p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Flight Map
          </Typography>

          <Box sx={{ height: "90%", width: "100%" }}>
            <LoadScript googleMapsApiKey="AIzaSyBsE2t1tmnMmY68if5rmvUTKYwwDJkoNt8">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={
                  destinationData[0]
                    ? {
                        lat: destinationData[0].lat,
                        lng: destinationData[0].lng,
                      }
                    : defaultCenter
                }
                zoom={8}
              >
                {destinationData.map((marker) => (
                  <Marker
                    key={marker.id}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    label={marker.label}
                  />
                ))}
              </GoogleMap>
            </LoadScript>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default FlightMap;
