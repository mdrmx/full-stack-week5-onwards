import { initTitleBar } from "./components/ui_components/titleBar.js";
import { searchInput } from "./components/ui_components/searchInput.js";
import { weatherApi, addFavourite, getFavourites } from "./apiRouter.js";
import { dailyForecast } from "./components/ui_components/weatherTile.js";
import { favButton, favList } from "./components/ui_components/favourites.js";
import "./style.css";

// Build the static page shell once the app container is available.
async function initApp() {
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

  //week 9 add fav button to page
  const favourite = favButton({ onButtonClick: handleFavClick });
  contentDiv.appendChild(favourite);

  //week 9 add fav list to page
  const favs = await getFavourites();
  const favListComponent = favList({
    favourites: favs.data,
    onSelect: async (placename) => {
      const data = await weatherApi(placename);
      dailyForecast(data.name, data.weather.current, data.weather.daily);
    },
  });
  contentDiv.appendChild(favListComponent);

  app.appendChild(titleBar);
  app.appendChild(contentDiv);
}

// Wait for DOM load so `#app` exists before mounting components.
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

const handleKeyInput = (event, inputElement) => {
  // Submit the search when the user presses Enter in the input.
  if (event.key === "Enter") {
    handleButtonClick(event, inputElement);
  }
};

const handleButtonClick = async (event, inputElement) => {
  // Submit the search when the search button is clicked.
  const query = inputElement.value.trim();
  console.log(query);
  // geocoding(query);

  const data = await weatherApi(query);

  dailyForecast(data.name, data.weather.current, data.weather.daily);

  inputElement.value = "";
};

//week 9 add fav button click handler
const handleFavClick = async (event) => {
  const placenameEl = document.getElementById("placename");
  if (!placenameEl) {
    console.log("No placename - search for a city first");
    return;
  }
  const query = placenameEl.textContent;
  const result = await addFavourite(query);
  console.log("result:", result);
};
