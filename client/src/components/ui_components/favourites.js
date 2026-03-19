import "./favourites.css";

// week 9 add fav button component to page
export function favButton({ onButtonClick }) {
  const button = document.createElement("button");
  button.textContent = "+";
  button.className = "fav-button";
  button.addEventListener("click", onButtonClick);
  return button;
}
// week 9 add fav list component to page
export function favList({ favourites, onSelect }) {
  // Create a select dropdown to list favourites
  const favListSelect = document.createElement("select");
  favListSelect.id = "fav-list";

  // Use change event on select to trigger onSelect callback when a favourite is selected
  favListSelect.addEventListener("change", (e) => {
    if (e.target.value) {
      onSelect(e.target.value);
    }
  });

  // Add a default option prompting user to select a favourite
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Select a favourite";
  defaultOption.value = "";
  favListSelect.appendChild(defaultOption);

  // Populate the select dropdown with favourite placenames from the API
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
      favListSelect.appendChild(option);
    });
  }

  return favListSelect;
}

// week 9 add function to update fav list when new fav is added
export function updateFavList(favourites) {
  // Check if the select element exists before trying to update it
  const favListSelect = document.getElementById("fav-list");
  if (!favListSelect) return;
  favListSelect.innerHTML = "";

  // Add default option prompting user to select a favourite
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "Select a favourite";
  defaultOption.value = "";
  favListSelect.appendChild(defaultOption);

  // Repopulate the select dropdown with the updated list of favourites
  favourites.forEach((fav) => {
    const option = document.createElement("option");
    option.textContent = fav.placename;
    option.value = fav.placename;
    favListSelect.appendChild(option);
  });
}
