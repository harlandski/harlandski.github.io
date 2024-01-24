async function fetchCards() {
  // Though node fetch doesn't care, browser fetch needs the final / or you get TypeError: Failed to fetch
  const response = await fetch("https://ru.arkhamdb.com/api/public/cards/");
  return await response.json();
}

async function setCards() {
  let cards = await fetchCards();
  localStorage.setItem("ArkhamCards", JSON.stringify(cards));
}

function checkDatabase() {
  if (!localStorage.getItem("ArkhamCards")) {
    const russianLabel = document.getElementById("russian-label");
    russianLabel.innerHTML = "Скачаются карты...";
    setCards();
    russianLabel.innerHTML = "Название карты на русском: ";
  }
}

function search(event) {
  event.preventDefault();
  const searchTerm = document.getElementById("russian").value;
  const cards = JSON.parse(localStorage.getItem("ArkhamCards"));
  const foundCard = cards.find((card) =>
    card.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );
  const found = foundCard.name;
  const name = foundCard.real_name;
  const image = "https://arkhamdb.com" + foundCard.imagesrc;
  document.getElementById("found").innerHTML = found;
  document.getElementById("english").innerHTML = name;
  const cardImage = document.getElementById("card-image")
  cardImage.src = image;
}

function monitorInput() {
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search-button").addEventListener("click", search);
  });
}

function setUpImageErrorHandling(){
  const cardImage = document.getElementById("card-image")
  cardImage.addEventListener("error", (event) => {event.target.src = "./assets/images/arkham-horror-card-back.png"
  event.onerror = null})
}

function main() {
  checkDatabase();
  setUpImageErrorHandling();
  monitorInput();
}

main();
