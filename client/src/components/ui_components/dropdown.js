export function dropdown({ onButtonClick } = {}) {
  const container = document.createElement("div");
  container.classList.add("dropdown-container");
  container.style.width = "225px";
  container.style.marginLeft = "15px";
  container.style.display = "flex";
  container.style.alignContent = "flex-start";
  container.style.gap = "10px";
  const dropdown = document.createElement("select");
  dropdown.classList.add("dropdown");

  const button = document.createElement("button");
  button.classList.add("dropdown-button");
  button.textContent = "Add favourite";
  button.addEventListener("click", onButtonClick);
  container.appendChild(button);

  container.appendChild(dropdown);
  return container;
}

export function updateDropdownOptions(dropdown, options) {
  dropdown.innerHTML = ""; // Clear existing options

  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = JSON.stringify(option.value);
    optionElement.textContent = option.text;
    dropdown.appendChild(optionElement);
  });
}
