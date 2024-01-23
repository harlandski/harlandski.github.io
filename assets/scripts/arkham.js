async function fetchCards() {
  // Though node fetch doesn't care, browser fetch needs the final / or you get TypeError: Failed to fetch
  const response = await fetch("https://ru.arkhamdb.com/api/public/cards/");
  return await response.json();
}

async function setCards() {
  let cards = await fetchCards();
  localStorage.setItem("ArkhamCards", JSON.stringify(cards));
}

function checkDatabase () {
  if (!localStorage.getItem("ArkhamCards")) {
    const russianLabel = document.getElementById("russian-label")
    russianLabel.innerHTML = "Скачаются карты..."
    setCards();
    russianLabel.innerHTML = "Название карты на русском: "
  }
}

function search (event) {
  event.preventDefault();
  const searchTerm = document.getElementById("russian").value;
  console.log(searchTerm);
  const cards = JSON.parse(localStorage.getItem("ArkhamCards"));
  console.log(cards);
  const foundCard = cards.find(card => card.name === searchTerm);
  const name = foundCard.real_name;
  const image = "https://arkhamdb.com" + foundCard.imagesrc;
  console.log(name);
  console.log(image);
  document.getElementById("english").innerHTML = name;
  document.getElementById("card-image").src = image;
  
}

function monitorInput () {
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search-button").addEventListener("click", search);
  })
}

function main () {
  checkDatabase();
  monitorInput();
  
}

main();