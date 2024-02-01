let englishRussian = false;

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
    const input = document.getElementById("input");

    const searchButton = document.getElementById("search-button");
    input.style.display = "none";
    searchButton.style.display = "none";
    russianLabel.innerHTML = "Скачается база данных";
    await setCards();
    russianLabel.innerHTML = "Название карты на русском: ";
    input.style.display = "inline-block";
    searchButton.style.display = "inline-block";
  }
}

function search(event) {
  event.preventDefault();
  if (event.target.value != "") {
    const searchTerm = document.getElementById("input").value;
    const cards = JSON.parse(localStorage.getItem("ArkhamCards"));
    // Note .includes() is better than === and .trim() is needed to get rid of spaces added by mobile keyboards
    let foundCard;
    if (englishRussian === false) { 
      foundCard = cards.find((card) =>
      card.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );}
    else {
      foundCard = cards.find((card) =>
      card.real_name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );}
    const found = foundCard.name;
    const name = foundCard.real_name;
    const code = foundCard.code;
    const image = "https://arkhamdb.com" + foundCard.imagesrc;
    const arkhamdb = "https://arkhamdb.com/card/";
    const arkhamdbRu = "https://ru.arkhamdb.com/card/";
    document.getElementById("found").href = arkhamdbRu + code;
    document.getElementById("found").innerHTML = found;
    document.getElementById("english").innerHTML = name;
    document.getElementById("english").href = arkhamdb + code;
    const cardImage = document.getElementById("card-image");
    cardImage.src = image;
    document.getElementById("input").value = "";
  }
}

function monitorInput() {
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search-button").addEventListener("click", search);
  });
  document.getElementById("input").addEventListener("change", search);
}

function setUpImageErrorHandling() {
  const cardImage = document.getElementById("card-image");
  cardImage.addEventListener("error", (event) => {
    event.target.src = "./assets/images/arkham-horror-card-back.png";
    event.onerror = null;
  });
}

function toggleTranslationDirection() {
  const toggle = document.getElementById("toggle");
  toggle.addEventListener("change", () => {
    if (toggle.checked) 
    { englishRussian = true;}
    else 
    { englishRussian = false;}
    selectDatalist(englishRussian);
  });
}

function selectDatalist(toggle) {
  if (toggle === false) {
    dataListRussian();
  } else {
    dataListEnglish();
  }
}

function dataListRussian() {
  document.getElementById("card-name").innerHTML="";
  const cards = JSON.parse(localStorage.getItem("ArkhamCards"));
  const allNames = [];
  for (card of cards) {
    allNames.push(card.name);
  }
  const sortedOnlyCyrillicNames = allNames
    .sort()
    .filter((item) => /[а-яА-Я]/.test(item));
  const sortedOnlyCyrillicNamesNoDupes = sortedOnlyCyrillicNames.filter(
    (value, index) => sortedOnlyCyrillicNames.indexOf(value) === index
  );
  for (item of sortedOnlyCyrillicNamesNoDupes) {
    const option = document.createElement("option");
    option.innerHTML = item;
    document.getElementById("card-name").appendChild(option);
  }
}

function dataListEnglish() {
  document.getElementById("card-name").innerHTML="";
  const cards = JSON.parse(localStorage.getItem("ArkhamCards"));
  const allNames = [];
  for (card of cards) {
    allNames.push(card.real_name);
  }
  const sortedNames = allNames.sort();
  const sortedNamesNoDupes = sortedNames.filter(
    (value, index) => sortedNames.indexOf(value) === index
  );
  for (item of sortedNamesNoDupes) {
    const option = document.createElement("option");
    option.innerHTML = item;
    document.getElementById("card-name").appendChild(option);
  }
}

// This function has to be async, and checkDatabase() called with await, so that the dataList will only
// be set up once the database is loaded the firsthttps://wordpress.org/support/topic/reset-a-toggle-button-programmatically/ time
async function main() {
  await checkDatabase();
  setUpImageErrorHandling();
  dataListRussian();
  toggleTranslationDirection();
  monitorInput();
}

main();
