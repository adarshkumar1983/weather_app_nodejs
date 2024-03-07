// App.js
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import WeatherApp from './components/WeatherComponent'; // Assuming this is your component

const theme = createTheme({
  // Define your theme here
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <WeatherApp />
    </ThemeProvider>
  );
}

export default App;
