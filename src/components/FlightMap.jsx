import React, { useState } from 'react';
import {
  SwipeableDrawer,
  Button,
  Box,
  Typography
} from '@mui/material';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 23.8103, // Dhaka
  lng: 90.4125,
};

const FlightMap = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <Button variant="contained" onClick={toggleDrawer(true)}>
        Show Flight Map
      </Button>

      <SwipeableDrawer
        anchor="right"                      // ✅ Open from right
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        PaperProps={{
          sx: { width: '50vw' }            // ✅ Set width to 50%
        }}
      >
        <Box sx={{ height: '100%', p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Flight Map
          </Typography>
          <Box sx={{ height: '90%', width: '100%' }}>
            <LoadScript googleMapsApiKey="AIzaSyBsE2t1tmnMmY68if5rmvUTKYwwDJkoNt8">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={8}
              >
                {/* Add markers or polylines if needed */}
              </GoogleMap>
            </LoadScript>
          </Box>
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default FlightMap;
