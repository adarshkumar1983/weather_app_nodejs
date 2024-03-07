// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Container, Typography, Paper, Grid, TextField, Button, CircularProgress } from '@mui/material';
// import { makeStyles } from '@mui/styles';


// const useStyles = makeStyles((theme) => ({
//   root: {
//     marginTop: theme.spacing(4),
//     marginBottom: theme.spacing(4),
//     padding: theme.spacing(4),
//     backgroundColor: '#f0f3f3',
//     borderRadius: theme.spacing(2),
//   },
//   form: {
//     marginBottom: theme.spacing(2),
//     display: 'flex',
//     alignItems: 'center',
//   },
//   textField: {
//     marginRight: theme.spacing(2),
//     flex: 1,
//   },
//   button: {
//     marginLeft: theme.spacing(2),
//   },
//   weatherContainer: {
//     marginTop: theme.spacing(4),
//     marginBottom: theme.spacing(4),
//     padding: theme.spacing(3),
//     borderRadius: theme.spacing(2),
//     boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
//   },
//   weatherItem: {
//     padding: theme.spacing(2),
//     border: '2px solid #ccc',
//     borderRadius: theme.spacing(1),
//     backgroundColor: '#f9f9f9',
//     marginBottom: theme.spacing(2),
//   },
//   loadingIndicator: {
//     display: 'flex',
//     justifyContent: 'center',
//     marginTop: theme.spacing(4),
//   },
//   savedLocationsContainer: {
//     marginTop: theme.spacing(2),
//     padding: theme.spacing(2),
//     borderRadius: theme.spacing(2),
//     boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
//   },
//   savedLocationButton: {
//     marginRight: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//     backgroundColor: '#3f51b5',
//     color: '#fff',
//     '&:hover': {
//       backgroundColor: '#303f9f',
//     },
//   },
// }));

// const WeatherApp = () => {
//   const classes = useStyles();
//   const [location, setLocation] = useState('');
//   const [forecast, setForecast] = useState(null);
//   const [error, setError] = useState('');
//   const [currentWeather, setCurrentWeather] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [temperatureUnit, setTemperatureUnit] = useState('Celsius');
//   const [savedLocations, setSavedLocations] = useState([]);

//   useEffect(() => {
//     // Load saved locations from local storage when component mounts
//     const savedLocationsFromStorage = localStorage.getItem('savedLocations');
//     if (savedLocationsFromStorage) {
//       setSavedLocations(JSON.parse(savedLocationsFromStorage));
//     }
//   }, []);

//   useEffect(() => {
//     // Save updated saved locations to local storage whenever it changes
//     localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
//   }, [savedLocations]);


//   // useEffect(() => {
//   //   // Fetch weather data for current location when component mounts
//   //   fetchWeatherData();
//   // }, []);

//   // const fetchWeatherData = async () => {
//   //   try {
//   //     setLoading(true);
//   //     // If location is not provided, fetch weather data for the current location
//   //     if (!location) {
//   //       navigator.geolocation.getCurrentPosition(async (position) => {
//   //         const { latitude, longitude } = position.coords;
//   //         const response = await axios.get(`http://localhost:5001/weather?location=${latitude},${longitude}`);
//   //         setCurrentWeather(response.data.currentWeather);
//   //         setForecast(response.data.forecast);
//   //         setLoading(false);
//   //       });
//   //     } else {
//   //       // Fetch weather data for the specified location
//   //       const response = await axios.get(`http://localhost:5001/weather?location=${location}`);
//   //       setCurrentWeather(response.data.currentWeather);
//   //       setForecast(response.data.forecast);
//   //       setLoading(false);
//   //     }
//   //     setError('');
//   //   } catch (error) {
//   //     console.error('Error fetching weather data:', error);
//   //     setError('Failed to fetch weather data. Please try again.');
//   //     setLoading(false);
//   //   }
//   // };

  
//  const fetchWeatherData = async () => {
//     try {
//       setLoading(true);
//       // If location is not provided, fetch weather data for the current location
//       if (!location) {
//         navigator.geolocation.getCurrentPosition(async (position) => {
//           const { latitude, longitude } = position.coords;
//           const response = await axios.get(`http://localhost:5001/weather?location=${latitude},${longitude}`);
//           setCurrentWeather(response.data.currentWeather);
//           setForecast(response.data.forecast);
//           setLoading(false);
//         });
//       } else {
//         // Fetch weather data for the specified location
//         const response = await axios.get(`http://localhost:5001/weather?location=${location}`);
//         setCurrentWeather(response.data.currentWeather);
//         setForecast(response.data.forecast);
//         setLoading(false);
//       }
//       setError('');
//     } catch (error) {
//       console.error('Error fetching weather data:', error);
//       setError('Failed to fetch weather data. Please try again.');
//       setLoading(false);
//     }
//   };

//   const handleSaveLocation = () => {
//     // Save the current location to the list of saved locations
//     if (location.trim() && !savedLocations.includes(location.trim())) {
//       setSavedLocations([...savedLocations, location.trim()]);
//     }
//   };

//   const handleViewSavedLocation = async (savedLocation) => {
//     // Fetch weather data for the selected saved location
//     setLocation(savedLocation);
//     await fetchWeatherData();
//   };

//   const kelvinToCelsius = (kelvin) => {
//     return kelvin - 273.15;
//   };

//   const kelvinToFahrenheit = (kelvin) => {
//     return (kelvin * 9) / 5 - 459.67;
//   };

//   const toggleTemperatureUnit = () => {
//     setTemperatureUnit(prevUnit => prevUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius');
//   };

//   const aggregateDailyTemperatures = (list) => {
//     const dailyTemperatures = {};

//     // Loop through the forecast data
//     list.forEach((item) => {
//       const forecastDate = new Date(item.dt * 1000);
//       const dateKey = forecastDate.toISOString().split('T')[0]; // Extract date without time

//       // Check if the date key exists in the dailyTemperatures object
//       if (!dailyTemperatures[dateKey]) {
//         // If not, initialize an object for the date
//         dailyTemperatures[dateKey] = {
//           max: -Infinity, // Initialize max temperature to negative infinity
//           min: Infinity, // Initialize min temperature to positive infinity
//         };
//       }

//       // Update max temperature if current temperature is higher
//       if (item.main.temp_max > dailyTemperatures[dateKey].max) {
//         dailyTemperatures[dateKey].max = item.main.temp_max;
//       }

//       // Update min temperature if current temperature is lower
//       if (item.main.temp_min < dailyTemperatures[dateKey].min) {
//         dailyTemperatures[dateKey].min = item.main.temp_min;
//       }
//     });

//     return dailyTemperatures;
//   };

//   return (
//     <Container maxWidth="md" className={classes.root}>
//       <Typography variant="h3" gutterBottom align="center">Weather App</Typography>
//       <Paper elevation={3} className={classes.weatherContainer}>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             fetchWeatherData();
//           }}
//           className={classes.form}
//         >
//           <Grid container spacing={2} alignItems="center">
//             <Grid item xs={12} sm={8}>
//               <TextField
//                 label="Enter city or coordinates"
//                 variant="outlined"
//                 fullWidth
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 type="submit"
//                 fullWidth
//                 className={classes.button}
//               >
//                 Get Weather
//               </Button>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 onClick={handleSaveLocation}
//                 fullWidth
//                 className={classes.button}
//               >
//                 Save Location
//               </Button>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Button
//                 variant="outlined"
//                 color="primary"
//                 onClick={toggleTemperatureUnit}
//                 fullWidth
//                 className={classes.button}
//               >
//                 Toggle Temperature Unit ({temperatureUnit})
//               </Button>
//             </Grid>
//           </Grid>
//         </form>
//         {error && <Typography color="error" align="center">{error}</Typography>}
//         {loading && (
//           <div className={classes.loadingIndicator}>
//             <CircularProgress />
//           </div>
//         )}
//         {currentWeather && (
//           <div className={classes.weatherItem}>
//             <Typography align="center" variant="h5">Current Weather</Typography>
//             <Typography align="center">Temperature: {temperatureUnit === 'Celsius' ? kelvinToCelsius(currentWeather.main.temp).toFixed(2) + '°C' : kelvinToFahrenheit(currentWeather.main.temp).toFixed(2) + '°F'}</Typography>
//             <Typography align="center">Description: {currentWeather.weather[0].description}</Typography>
//           </div>
//         )}
//         {forecast && (
//           <div className={classes.weatherItem}>
//             <Typography align="center" variant="h5">5-Day Weather Forecast</Typography>
//             <Grid container spacing={2} justify="center">
//               {Object.entries(aggregateDailyTemperatures(forecast.list)).map(([date, temperatures]) => (
//                 <Grid item key={date} xs={12} sm={6} md={4} lg={3}>
//                   <div className={classes.weatherItem}>
//                     <Typography align="center" variant="h6">{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</Typography>
//                     <Typography align="center">{date}</Typography>
//                     <Typography align="center">Max: {temperatureUnit === 'Celsius' ? kelvinToCelsius(temperatures.max).toFixed(2) + '°C' : kelvinToFahrenheit(temperatures.max).toFixed(2) + '°F'}</Typography>
//                     <Typography align="center">Min: {temperatureUnit === 'Celsius' ? kelvinToCelsius(temperatures.min).toFixed(2) + '°C' : kelvinToFahrenheit(temperatures.min).toFixed(2) + '°F'}</Typography>
//                   </div>
//                 </Grid>
//               ))}
//             </Grid>
//           </div>
//         )}
//       </Paper>
//       <Paper elevation={3} className={classes.savedLocationsContainer}>
//         <Typography variant="h5" gutterBottom align="center">Saved Locations</Typography>
//         <Grid container spacing={2} justify="center">
//           {savedLocations.map((savedLocation, index) => (
//             <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
//               <Button
//                 variant="outlined"
//                 onClick={() => handleViewSavedLocation(savedLocation)}
//                 fullWidth
//                 className={classes.savedLocationButton}
//               >
//                 {savedLocation}
//               </Button>
//             </Grid>
//           ))}
//         </Grid>
//       </Paper>
//     </Container>
//   );
// };

// export default WeatherApp;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './App.css'; // Import your custom CSS file for styling

const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState('');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState('Celsius');
  const [savedLocations, setSavedLocations] = useState([]);

  useEffect(() => {
    // Load saved locations from local storage when component mounts
    const savedLocationsFromStorage = localStorage.getItem('savedLocations');
    if (savedLocationsFromStorage) {
      setSavedLocations(JSON.parse(savedLocationsFromStorage));
    }
  }, []);

  useEffect(() => {
    // Save updated saved locations to local storage whenever it changes
    localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
  }, [savedLocations]);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      // If location is not provided, fetch weather data for the current location
      if (!location) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await axios.get(`http://localhost:5001/weather?location=${latitude},${longitude}`);
          setCurrentWeather(response.data.currentWeather);
          setForecast(response.data.forecast);
          setLoading(false);
        });
      } else {
        // Fetch weather data for the specified location
        const response = await axios.get(`http://localhost:5001/weather?location=${location}`);
        setCurrentWeather(response.data.currentWeather);
        setForecast(response.data.forecast);
        setLoading(false);
      }
      setError('');
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Failed to fetch weather data. Please try again.');
      setLoading(false);
    }
  };

  const handleSaveLocation = () => {
    // Save the current location to the list of saved locations
    if (location.trim() && !savedLocations.includes(location.trim())) {
      setSavedLocations([...savedLocations, location.trim()]);
    }
  };

  const handleViewSavedLocation = async (savedLocation) => {
    // Fetch weather data for the selected saved location
    setLocation(savedLocation);
    await fetchWeatherData();
  };

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  const kelvinToFahrenheit = (kelvin) => {
    return (kelvin * 9) / 5 - 459.67;
  };

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(prevUnit => prevUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius');
  };

  const aggregateDailyTemperatures = (list) => {
    const dailyTemperatures = {};

    // Loop through the forecast data
    list.forEach((item) => {
      const forecastDate = new Date(item.dt * 1000);
      const dateKey = forecastDate.toISOString().split('T')[0]; // Extract date without time

      // Check if the date key exists in the dailyTemperatures object
      if (!dailyTemperatures[dateKey]) {
        // If not, initialize an object for the date
        dailyTemperatures[dateKey] = {
          max: -Infinity, // Initialize max temperature to negative infinity
          min: Infinity, // Initialize min temperature to positive infinity
        };
      }

      // Update max temperature if current temperature is higher
      if (item.main.temp_max > dailyTemperatures[dateKey].max) {
        dailyTemperatures[dateKey].max = item.main.temp_max;
      }

      // Update min temperature if current temperature is lower
      if (item.main.temp_min < dailyTemperatures[dateKey].min) {
        dailyTemperatures[dateKey].min = item.main.temp_min;
      }
    });

    return dailyTemperatures;
  };

  return (
    <div className="container">
      <h1 className="heading">Weather App</h1>
      <div className="form">
        <input
          type="text"
          placeholder="Enter city or coordinates"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={fetchWeatherData}>Get Weather</button>
        <button onClick={handleSaveLocation}>Save Location</button>
        <button onClick={toggleTemperatureUnit}>Toggle Temperature Unit ({temperatureUnit})</button>
      </div>
      {error && <p className="error">{error}</p>}
      {loading && <div className="loading-indicator">Loading...</div>}
      {currentWeather && (
        <div className="weather-item">
          <h2>Current Weather</h2>
          <p>Temperature: {temperatureUnit === 'Celsius' ? kelvinToCelsius(currentWeather.main.temp).toFixed(2) + '°C' : kelvinToFahrenheit(currentWeather.main.temp).toFixed(2) + '°F'}</p>
          <p>Description: {currentWeather.weather[0].description}</p>
        </div>
      )}
      {forecast && (
        <div className="weather-item">
          <h2>5-Day Weather Forecast</h2>
          <div className="forecast">
            {Object.entries(aggregateDailyTemperatures(forecast.list)).map(([date, temperatures]) => (
              <div key={date} className="forecast-item">
                <h3>{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</h3>
                <p>{date}</p>
                <p>Max: {temperatureUnit === 'Celsius' ? kelvinToCelsius(temperatures.max).toFixed(2) + '°C' : kelvinToFahrenheit(temperatures.max).toFixed(2) + '°F'}</p>
                <p>Min: {temperatureUnit === 'Celsius' ? kelvinToCelsius(temperatures.min).toFixed(2) + '°C' : kelvinToFahrenheit(temperatures.min).toFixed(2) + '°F'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="saved-locations">
        <h2>Saved Locations</h2>
        <div className="saved-locations-list">
          {savedLocations.map((savedLocation, index) => (
            <button key={index} onClick={() => handleViewSavedLocation(savedLocation)}>{savedLocation}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
