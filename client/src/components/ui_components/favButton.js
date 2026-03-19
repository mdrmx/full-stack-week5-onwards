export function favButton({ onButtonClick }) {
  const button = document.createElement("button");
  button.className = "fav-button";
  button.addEventListener("click", onButtonClick);
  return button;
}
