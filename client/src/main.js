import { initTitleBar } from "./components/ui_components/titleBar.js";
import { searchInput } from "./components/ui_components/searchInput.js";
import { weatherApi, addFavourite, getFavourites } from "./apiRouter.js";
import { dailyForecast } from "./components/ui_components/weatherTile.js";
import {
  favButton,
  favList,
  updateFavList,
} from "./components/ui_components/favourites.js";
import "./style.css";

// Build the static page shell once the app container is available.
async function initApp() {
  const app = document.getElementById("app");

  // Title Bar Configuration with props
  const props = {
    title: "OpenWeatherApp",
    menuConfig: {
      menuIcon: "\u2630",
      menuStyle: "large",
      menuItems: [
        { text: "About", href: "about" },
        { text: "Contact", href: "contact" },
        { text: "Services", href: "services" },
        { text: "Settings", href: "settings" },
      ],
    },
  };
  const titleBar = initTitleBar(props);

  // Main content div to hold search and forecast results
  const contentDiv = document.createElement("div");
  contentDiv.id = "content-div";

  // Search input component with event handlers for user interactions
  const search = searchInput({
    placeholder: "Enter town or city...",
    onInputKeyPress: handleKeyInput,
    onButtonClick: handleButtonClick,
  });

  //////////////////////////////
  // week 9 favourite component and database integration
  //////////////////////////////

  // Create the favourite button and list components
  const favouriteButton = favButton({ onButtonClick: handleFavClick });

  // Fetch any stored favourites from the API
  const favs = await getFavourites();
  console.log("favourites retrieved from API:", favs);

  // Create the favourite list component with the retrieved favourites and onSelect handler
  const favListComponent = favList({
    favourites: favs.data,
    onSelect: handleFavSelect,
  });

  // Append the title bar and content div to the app container
  app.appendChild(titleBar);
  app.appendChild(contentDiv);

  // Add the search input, favourite button, and favourite list components to the page
  contentDiv.appendChild(search);
  contentDiv.appendChild(favouriteButton);
  contentDiv.appendChild(favListComponent);
}

// Wait for DOM load so `#app` exists before mounting components.
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

//////////////////////////////////////
//event handlers for user interactions
//////////////////////////////////////
// Event handler for search input keypress - submit search on Enter key
const handleKeyInput = (event, inputElement) => {
  // Submit the search when the user presses Enter in the input.
  if (event.key === "Enter") {
    handleButtonClick(event, inputElement);
  }
};

// Event handler for search button click - fetch weather data for input place name
const handleButtonClick = async (event, inputElement) => {
  // Submit the search when the search button is clicked.
  const query = inputElement.value.trim();
  const data = await weatherApi(query);
  dailyForecast(data.name, data.weather.current, data.weather.daily);
  inputElement.value = "";
};

//week 9 event handler for fav button click - add current place name to favourites list
const handleFavClick = async (event) => {
  const placenameEl = document.getElementById("placename");
  const query = placenameEl.textContent;
  const favList = document.getElementById("fav-list");
  for (let i = 0; i < favList.options.length; i++) {
    if (favList.options[i].value === query) {
      alert("This place is already in your favourites!");
      return;
    }
  }

  await addFavourite(query);
  const favs = await getFavourites();
  updateFavList(favs.data);
};

// week 9 event handler for selecting a favourite from the list - fetch weather data for selected favourite place name
const handleFavSelect = async (event) => {
  console.log(event);
  const placename = event;
  const data = await weatherApi(placename);
  dailyForecast(data.name, data.weather.current, data.weather.daily);
};
