import express from "express";
import dotenv from "dotenv";

//////////////////////////////////////
// Server setup
//////////////////////////////////////
dotenv.config();

const app = express();
const port = 3000;
const apiKey = process.env.API_KEY;

// week 9 add middleware to parse JSON request bodies
app.use(express.json());

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
    placename TEXT NOT NULL
  )
`,
).run();

//////////////////////////////////////
// Helper functions for fetching
// weather data from OpenWeather API
//////////////////////////////////////
async function geocoding(placename) {
  // Resolve a place name to coordinates, then fetch weather for the top match.
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${placename}&limit=5&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    // OpenWeather geocoding returns a list of matches; use the first result.
    const { name, lat, lon } = data[0];
    const weather = await getWeatherData(lat, lon);
    return { name, weather };
  } catch (error) {
    console.error(error);
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
app.get("/weather", async (req, res) => {
  console.log(req.query);
  const { placename } = req.query;
  const data = await geocoding(placename);
  res.json(data);
});

app.post("/saveFavourite", async (req, res) => {
  const { placename } = req.body;
  db.prepare("INSERT INTO favourites (placename) VALUES (?)").run(placename);
  res.json({ success: true, data: req.body });
});

app.get("/getFavourites", async (req, res) => {
  const favourites = db.prepare("SELECT * FROM favourites").all();
  res.json({ success: true, data: favourites });
});

//////////////////////////////////////
// Start the server
//////////////////////////////////////
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port} `);
});
