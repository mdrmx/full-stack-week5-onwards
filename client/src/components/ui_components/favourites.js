import "./favourites.css";

export function favButton({ onButtonClick }) {
  const button = document.createElement("button");
  button.textContent = "+";
  button.className = "fav-button";
  button.addEventListener("click", onButtonClick);
  return button;
}

export function favList({ favourites, onSelect }) {
  const favListSelect = document.createElement("select");
  favListSelect.id = "fav-list";

  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Select a favourite";
  defaultOption.value = "";
  favListSelect.appendChild(defaultOption);

  if (favourites.length === 0) {
    const noFavOption = document.createElement("option");
    noFavOption.textContent = "No favourites saved";
    noFavOption.value = "";
    favListSelect.appendChild(noFavOption);
  } else {
    favourites.forEach((fav) => {
      const option = document.createElement("option");
      option.textContent = fav.placename;
      option.value = fav.placename;
      option.addEventListener("click", () => onSelect(fav.placename));
      favListSelect.appendChild(option);
    });
  }

  return favListSelect;
}
