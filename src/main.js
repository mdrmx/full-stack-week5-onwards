import { initTitleBar } from "./components/titleBar.js";
import { searchInput } from "./components/ui_components/searchInput.js";
import { geocoding } from "./apiRouter.js";
import "./style.css";
function initApp() {
  const app = document.getElementById("app");

  const props = {
    title: "Weather App",
    menuConfig: {
      menuIcon: "\u2630",
      menuStyle: "large",
      menuItems: [
        { text: "About", href: "about" },
        { text: "Contact", href: "contact" },
        { text: "Services", href: "services" },
      ],
    },
  };
  const titleBar = initTitleBar(props);

  const contentDiv = document.createElement("div");

  const search = searchInput({
    placeholder: "Enter town or city...",
    onInputKeyPress: handleKeyInput,
    onButtonClick: handleButtonClick,
  });

  app.appendChild(titleBar);
  contentDiv.appendChild(search);
  app.appendChild(contentDiv);
}

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

const handleKeyInput = (event, inputElement) => {
  if (event.key === "Enter") {
    const query = inputElement.value.trim();
    console.log(query);
    geocoding(query);
    inputElement.value = "";
  }
};

const handleButtonClick = (event, inputElement) => {
  const query = inputElement.value.trim();
  console.log(query);
  geocoding(query);
  inputElement.value = "";
};
