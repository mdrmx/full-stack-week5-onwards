//simple express server with get route to fetch weather data from openweathermap api
//import express and node-fetch modules
import express from "express";
import fetch from "node-fetch";
//import environment variables from .env file
import dotenv from "dotenv";
dotenv.config();

//create express app and set port number
const app = express();
const port = 3000;

//helper function to geocode a place name to coordinates using OpenWeather Geocoding API
async function geocodeLocation(placename, apiKey) {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${placename}&limit=5&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error(`Geocoding failed for "${placename}"`);
  }
  return { lat: data[0].lat, lon: data[0].lon };
}
//helper function to fetch weather data from OpenWeather One Call API
async function getWeatherData(lat, lon, apiKey) {
  // apiKey must be passed in from caller to avoid relying on an undefined global
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

//define get route to fetch weather data from openweathermap api
app.get("/weather", async (req, res) => {
  // read API key from environment variable and log the request
  const apiKey = process.env.API_KEY;

  // if API key is missing, log an error and return a 500 response
  if (!apiKey) {
    console.error("Missing API_KEY environment variable");
    return res.status(500).json({ error: "Server missing API key" });
  }

  // get query params and decide how to fetch coordinates
  const { placename, lat, lon } = req.query;

  try {
    let coords;

    // if only placename is provided, geocode it to get coordinates;
    // if lat and lon are provided, use them directly;
    // otherwise return an error

    if (placename && !lat && !lon) {
      coords = await geocodeLocation(placename, apiKey);
    } else if (lat && lon) {
      coords = { lat: parseFloat(lat), lon: parseFloat(lon) };
    } else {
      console.error("Bad request to /weather, missing parameters", req.query);
      return res
        .status(400)
        .json({ error: "Must provide either placename or lat and lon" });
    }

    const weatherData = await getWeatherData(coords.lat, coords.lon, apiKey);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

//start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
