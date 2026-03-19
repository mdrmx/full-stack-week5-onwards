import { dailyForecast } from "./components/ui_components/weatherTile.js";

export async function weatherApi(placename) {
  const url = `/weather?placename=${placename}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
  // dailyForecast(data.current, data.daily);
}
