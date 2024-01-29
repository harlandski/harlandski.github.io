async function fetchCards() {
  // Though node fetch doesn't care, browser fetch needs the final / or you get TypeError: Failed to fetch
  const response = await fetch("https://ru.arkhamdb.com/api/public/cards/");
  return await response.json();
}

async function setCards() {
  let cards = await fetchCards();
  localStorage.setItem("ArkhamCards", JSON.stringify(cards));
}

async function checkDatabase() {
  if (!localStorage.getItem("ArkhamCards")) {
    const russianLabel = document.getElementById("russian-label");
    russianLabel.innerHTML = "Скачаются карты...";
    await setCards();
    russianLabel.innerHTML = "Название карты на русском: ";
  }
}

function search(event) {
  event.preventDefault();
  if (event.target.value !="") {
  const searchTerm = document.getElementById("russian").value;
  const cards = JSON.parse(localStorage.getItem("ArkhamCards"));
  // Note .includes() is better than === and .trim() is needed to get rid of spaces added by mobile keyboards
  const foundCard = cards.find((card) =>
    card.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );
  const found = foundCard.name;
  const name = foundCard.real_name;
  const image = "https://arkhamdb.com" + foundCard.imagesrc;
  document.getElementById("found").innerHTML = found;
  document.getElementById("english").innerHTML = name;
  const cardImage = document.getElementById("card-image");
  cardImage.src = image;
  document.getElementById("russian").value=""; }
}

function monitorInput() {
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search-button").addEventListener("click", search);
  });
  document.getElementById("russian").addEventListener("change", search);
}

function setUpImageErrorHandling() {
  const cardImage = document.getElementById("card-image");
  cardImage.addEventListener("error", (event) => {
    event.target.src = "./assets/images/arkham-horror-card-back.png";
    event.onerror = null;
  });
}
function dataList() {
  const cards = JSON.parse(localStorage.getItem("ArkhamCards"));
  const allNames = [];
  for (card of cards) {
    allNames.push(card.name);
  }
  const sortedOnlyCyrillicNames = allNames
    .sort()
    .filter((item) => /[а-яА-Я]/.test(item));
  const sortedOnlyCyrillicNamesNoDupes = sortedOnlyCyrillicNames.filter((value,index) => sortedOnlyCyrillicNames.indexOf(value) === index);
  for (item of sortedOnlyCyrillicNamesNoDupes) {
    const option = document.createElement("option");
    option.innerHTML = item;
    document.getElementById("card-name").appendChild(option);
  }
}

// This function has to be async, and checkDatabase() called with await, so that the dataList will only 
// be set up once the database is loaded the first time
async function main() {
  await checkDatabase();
  setUpImageErrorHandling();
  dataList();
  monitorInput();
}

main();
