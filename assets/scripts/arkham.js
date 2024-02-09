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
  // Only do this if localStorage doesn't already have the database
  if (!localStorage.getItem("ArkhamCards")) {
    // Set variables for document manipulation
    const inputLabel = document.getElementById("input-label");
    const input = document.getElementById("input");
    const searchButton = document.getElementById("search-button");
    const slider = document.getElementById("slider");
    // While database is loading, don't display things
    input.style.display = "none";
    searchButton.style.display = "none";
    slider.style.display = "none";
    inputLabel.innerHTML = "Скачается база данных...";
    await setCards();
    /// Once database is loaded, display everything
    inputLabel.innerHTML = "Название карты:";
    input.style.display = "inline-block";
    searchButton.style.display = "inline-block";
    slider.style.display = "block";
  }
}

function search(event) {
  event.preventDefault();
  if (event.target.value != "") {
    const searchTerm = document.getElementById("input").value;
    const cards = JSON.parse(localStorage.getItem("ArkhamCards"));
    // Using the toggle state instead of a global variable
    const toggle = document.getElementById("toggle");
    const arkhamdb = "https://arkhamdb.com/card/";
    const arkhamdbRu = "https://ru.arkhamdb.com/card/";
    const input = document.getElementById("input");
    const russian = document.getElementById("russian");
    const english = document.getElementById("english");
    const cardImage = document.getElementById("card-image");
    let foundCard;
    if (toggle.checked === false) {
      // Note .includes() is better than === and .trim() is needed to get rid of spaces added by mobile keyboards
      foundCard = cards.find((card) =>
        card.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    } else {
      foundCard = cards.find((card) =>
        card.real_name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    }
    // Define variables based on properties of the found card
    const name = foundCard.name;
    const realName = foundCard.real_name;
    const code = foundCard.code;
    const image = "https://arkhamdb.com" + foundCard.imagesrc;
    // Update the html with the properties
    russian.href = arkhamdbRu + code;
    russian.innerHTML = name;
    english.innerHTML = realName;
    english.href = arkhamdb + code;
    cardImage.src = image;
    // Clear the input box after a search
    input.value = "";
  }
}

function monitorInput() {
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("search-button").addEventListener("click", search);
  });
  document.getElementById("input").addEventListener("change", search);
}

function setUpImageErrorHandling() {
  // If there is no image available, then display a default card back image
  const cardImage = document.getElementById("card-image");
  cardImage.addEventListener("error", (event) => {
    event.target.src = "./assets/images/arkham-horror-card-back.png";
    // This is to stop a infinite loop if the above image does not display for some reason
    event.onerror = null;
  });
}

function toggleTranslationDirection() {
  const toggle = document.getElementById("toggle");
  toggle.addEventListener("change", () => {
    selectDatalist(toggle.checked);
  });
}

function selectDatalist(toggle) {
  if (toggle === false) {
    // Note the regex is given literally, without quotes
    dataList("name", /[а-яА-Я]/);
  } else {
    dataList("real_name", /[a-zA-Z]/);
  }
}

function dataList(nameProperty, regex) {
  // Clears any previous list
  document.getElementById("card-name").innerHTML = "";
  // Loads the database from localStorage
  const cards = JSON.parse(localStorage.getItem("ArkhamCards"));
  const allNames = [];
  for (card of cards) {
    // nameProperty will be either name or real_name depending on translation direction
    allNames.push(card[nameProperty]);
  }
  const sortedNames = allNames
    .sort()
    // This is necessary to get rid of English names of cards not yet translated into Russian
    // It is techniclaly unnecessary for the English-Russian direction, but is here for expandability
    .filter((item) => regex.test(item));
  // This removes duplicate names
  // TODO manage different XP cards properly?
  // Or is this beyond the scope of a translator?
  const sortedNamesNoDupes = sortedNames.filter(
    (value, index) => sortedNames.indexOf(value) === index
  );
  // Creates the actual list of card names
  for (item of sortedNamesNoDupes) {
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
  selectDatalist(document.getElementById("toggle").checked);
  toggleTranslationDirection();
  monitorInput();
}

main();
