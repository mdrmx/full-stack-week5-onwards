import "./favButton.css";
export function favButton({ onButtonClick }) {
  const button = document.createElement("button");
  button.className = "fav-button";

  button.innerText = "add favourite";
  button.addEventListener("click", onButtonClick);
  return button;
}
