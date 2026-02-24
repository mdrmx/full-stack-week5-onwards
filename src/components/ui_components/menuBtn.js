function handleClick(event) {
  const menuBtn = event.currentTarget;
  const isHamburger = menuBtn.textContent === "\u2630";
  menuBtn.textContent = isHamburger ? "\u2715" : "\u2630";

  const menu = document.getElementById("menu-panel");
  menu.style.display = isHamburger ? "block" : "none";
}

export function menuBtn() {
  const menuBtn = document.createElement("div");
  menuBtn.id = "menu-btn";
  menuBtn.textContent = "\u2630";
  menuBtn.addEventListener("click", handleClick);
  return menuBtn;
}
