import { initTitleBar } from "./components/ui_components/titleBar.js";
import { searchInput } from "./components/ui_components/searchInput.js";
import { weatherApi } from "./apiRouter.js";
import "./style.css";
import { dailyForecast } from "./components/ui_components/weatherTile.js";
import {
  dropdown,
  updateDropdownOptions,
} from "./components/ui_components/dropdown.js";

// Build the static page shell once the app container is available.
function initApp() {
  const app = document.getElementById("app");

  // Title Bar Configuration with props
  const props = {
    title: "title",
    menuConfig: {
      menuIcon: "\u2630",
      menuStyle: "small",
      menuItems: [
        { text: "About", href: "about" },
        { text: "Contact", href: "contact" },
        { text: "Services", href: "services" },
        { text: "Settings", href: "settings" },
      ],
    },
  };
  const titleBar = initTitleBar(props);

  const contentDiv = document.createElement("div");
  contentDiv.id = "content-div";

  const search = searchInput({
    placeholder: "Enter town or city...",
    onInputKeyPress: handleKeyInput,
    onButtonClick: handleButtonClick,
  });

  contentDiv.appendChild(search);

  const dropdownMenu = dropdown({ onButtonClick: handleFavButtonClick });
  contentDiv.appendChild(dropdownMenu);

  app.appendChild(titleBar);
  app.appendChild(contentDiv);
}

// Wait for DOM load so `#app` exists before mounting components.
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

const handleKeyInput = async (event, inputElement) => {
  // Submit the search when the user presses Enter in the input.
  if (event.key === "Enter") {
    await handleButtonClick(event, inputElement);
  }
};

let latitude = null;
let longitude = null;
const handleButtonClick = async (event, inputElement) => {
  // Submit the search when the search button is clicked.
  const query = inputElement.value.trim();

  const { weatherData, name, lat, lon } = await weatherApi(query);
  latitude = lat;
  longitude = lon;
  console.log(name, weatherData);
  dailyForecast(name, weatherData.current, weatherData.daily);
  inputElement.value = "";
};

const handleFavButtonClick = async (event) => {
  const placename = document.querySelector("#content-div h2").textContent;
  const lat = latitude;
  const lon = longitude;
  try {
    const response = await fetch("/favourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ placename, lat, lon }),
    });
    if (response.ok) {
      console.log("Favourite saved successfully");
      try {
        const optionsResponse = await fetch("/fetchFavourites");
        if (optionsResponse.ok) {
          const optionsData = await optionsResponse.json();
          const dropdownElement = document.querySelector(".dropdown");
          console.log("Fetched favourites for dropdown:", optionsData);
          updateDropdownOptions(
            dropdownElement,
            optionsData.map((option) => ({
              value: { lat: option.lat, lon: option.lon },
              text: option.placename,
            })),
          );
        } else {
          console.error(
            "Failed to fetch favourites:",
            optionsResponse.statusText,
          );
        }
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    }
  } catch (error) {
    console.error("Error saving favourite:", error);
  }
};
