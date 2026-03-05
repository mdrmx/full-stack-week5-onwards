import { dailyForecast } from "./components/ui_components/weatherTile.js";

// call the local express API rather than hitting OpenWeather directly
export async function fetchWeather({ placename }) {
  let url;

  // build query string based on what was provided
  const params = new URLSearchParams();
  if (placename) url = `/weather?placename=${placename}`;

  // make request to our own server

  try {
    const response = await fetch(url);
    const data = await response.json();
    dailyForecast(data.current, data.daily);
  } catch (error) {
    console.log("fetchWeather failed:", error);
  }
}
