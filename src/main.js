import { initTitleBar } from "./components/titleBar.js";
import { searchInput } from "./components/ui_components/searchInput.js";
function initApp() {
  const app = document.getElementById("app");
  const titleBar = initTitleBar();
  const contentDiv = document.createElement("div");

  const handleKeyInput = (event, inputElement) => {
    if (event.key === "Enter") {
      const query = inputElement.value.trim();
      console.log(query);
      inputElement.value = "";
    }
  };

  const handleButtonClick = (event, inputElement) => {
    const query = inputElement.value.trim();
    console.log(query);
    inputElement.value = "";
  };

  const search = searchInput({
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
