import express from "express";
import dotenv from "dotenv";

//////////////////////////////////////
// Server setup
//////////////////////////////////////
const app = express(); // Create an Express application
const port = 3000; // Define the port the server will listen on

app.use(express.json()); // Parse JSON request bodies

dotenv.config(); // Load environment variables from .env file
const apiKey = process.env.API_KEY; // Load the API key from environment variables

//////////////////////////////////////
//better-sqlite3 database setup
//////////////////////////////////////
import Database from "better-sqlite3";
const db = new Database("favourites.db");

// Create the favourites table if it doesn't exist
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS favourites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    placename TEXT NOT NULL,
    lat REAL NOT NULL,
    lon REAL NOT NULL
  )
`,
).run();

//////////////////////////////////////
// Helper functions for fetching
// weather data from OpenWeather API
//////////////////////////////////////

// Resolve a place name to coordinates, then fetch weather for the top match.
async function geocoding(placename) {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${placename}&limit=5&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    // OpenWeather geocoding returns a list of matches; use the first result.
    const { name, lat, lon } = data[0];
    console.log(data[0]);
    const weatherData = await getWeatherData(lat, lon);
    return { weatherData, name, lat, lon };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

// Fetch One Call weather data and pass it to the forecast renderer.
async function getWeatherData(lat, lon) {
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

//////////////////////////////////////
//API endpoints
//////////////////////////////////////

// Endpoint to fetch weather data for a given place name
app.get("/weather", async (req, res) => {
  const { placename } = req.query;
  const data = await geocoding(placename);
  res.send(data);
});

// Endpoint to save a favourite location to the database
app.post("/favourites", async (req, res) => {
  const { placename, lat, lon } = req.body;
  console.log(req.body);
  //save data to database here
  db.prepare(
    "INSERT INTO favourites (placename, lat, lon) VALUES (?, ?, ?)",
  ).run(placename, lat, lon);

  res.send("data saved");
});

// Endpoint to fetch all favourite locations from the database
app.get("/fetchFavourites", async (req, res) => {
  const data = db.prepare("SELECT * FROM favourites").all();
  console.log("fetched favourites:", data);
  res.send(data);
});

//////////////////////////////////////
// Start the server
//////////////////////////////////////
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port} `);
});
