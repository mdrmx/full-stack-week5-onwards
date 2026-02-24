export function createMenuPanel() {
  const menu = document.createElement("div");
  menu.id = "menu-panel";
  menu.textContent = "menu";
  menu.style.display = "none";
  return menu;
}
