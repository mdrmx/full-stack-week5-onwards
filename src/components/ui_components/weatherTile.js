export function weatherTile() {
  const weatherTileDiv = document.createElement("div");
  weatherTileDiv.id = "weather-tile-div";

  const temp = document.createElement("div");
  temp.id = "current-temp";

  weatherTileDiv.appendChild(temp);
  return weatherTileDiv;
}
