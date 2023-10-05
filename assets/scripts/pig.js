const players = [
  {
    name: "Amara",
    color: "color: red",
    score: 0,
    total: 0,
  },
  {
    name: "Isabelle",
    color: "color: purple",
    score: 0,
    total: 0,
  },
  {
    name: "Daddy",
    color: "color: blue",
    score: 0,
    total: 0,
  },
];

const names = document.getElementsByClassName("name");
const scores = document.getElementsByClassName("score");
const whoseTurn = document.getElementById("whose-turn");
const rollButton = document.getElementById("roll-button");
const keepButton = document.getElementById("keep-button");
const diceTray = document.getElementById("dice-tray");
// Folowing taken from https://javascript.info/array-methods#shuffle-an-array

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function colorPlayers() {
  for (let number = 0; number < names.length; number++) {
    names[number].style = players[number].color;
  }
}

function updateScoreboard() {
  for (let number = 0; number < names.length; number++) {
    names[number].innerHTML = players[number].name;
    scores[number].innerHTML = players[number].total;
  }
  whoseTurn.innerHTML = players[player].name + "'s turn";
}

function roll2d6() {
  let rolls = [];
  for (let i = 0; i < 2; i++) {
    rolls.push(Math.floor(Math.random() * 6) + 1);
  }
  return rolls;
}

function advancePlayer() {
  player++;
  if (player > players.length-1) {
    player = 0;
  }
}

function pigAlert(message, timeout) {
  setTimeout(() => alert(message), timeout);
}

shuffle(players);
let player = 0;
colorPlayers();
updateScoreboard();

rollButton.onclick = () => {
  rolls = roll2d6();
  diceTray.innerHTML +=
    players[player].name + "  " + rolls[0] + " " + rolls[1] + " <br>";
  if (rolls[0] === 6 && rolls[1] === 6) {
    players[player].score = 0;
    players[player].total = 0;
    advancePlayer();
    updateScoreboard();
    pigAlert("Big Pig!", 50);
  } else if (rolls[0] === 6 || rolls[1] === 6) {
    players[player].score = 0;
    advancePlayer();
    updateScoreboard();
    pigAlert("Pig!", 50);
  } else {
    players[player].score += rolls[0] + rolls[1];
  }
};

keepButton.onclick = () => {
  if (players[player].score > 0) {
    players[player].total += players[player].score;
    players[player].score = 0;
    diceTray.innerHTML = "";
    advancePlayer();
    updateScoreboard();
  }
};
