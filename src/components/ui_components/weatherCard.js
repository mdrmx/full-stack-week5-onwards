export function weatherCard() {
  const weatherCardDiv = document.createElement("div");
  weatherCardDiv.id = "weather-card-div";

  const temp = document.createElement("div");
  temp.id = "current-temp";

  weatherCardDiv.appendChild(temp);
  return weatherCardDiv;
}
