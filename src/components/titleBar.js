import { menuBtn } from "./ui_components/menuBtn.js";
import { createMenuPanel } from "./ui_components/menuPanel.js";

export function initTitleBar() {
  const titleDiv = document.createElement("div");
  titleDiv.id = "title-div";

  const h1 = document.createElement("h1");
  h1.textContent = "my module based website";

  const hamburger = menuBtn();

  const menu = createMenuPanel();

  titleDiv.appendChild(h1);
  titleDiv.appendChild(hamburger);
  titleDiv.appendChild(menu);

  return titleDiv;
}
