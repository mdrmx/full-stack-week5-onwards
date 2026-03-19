export async function weatherApi(placename) {
  const url = `/weather?placename=${placename}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

//week 9 add function to call API to add favorite
export async function addFavourite(placename) {
  const url = `/saveFavourite`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ placename }),
  });
  const data = await response.json();
  return data;
}

//week 9 add function to call API to retrieve favorites
export async function getFavourites() {
  const url = `/getFavourites`;
  console.log("fetching favourites from server...");
  const response = await fetch(url);
  const data = await response.json();
  console.log("favourites data:", data);
  return data;
}
