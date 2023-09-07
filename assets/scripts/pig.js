const amaraColor = 'color: red';
const isabelleColor = 'color: purple';
const daddyColor = 'color: blue';
const players = ["Amara", "Isabelle", "Daddy"];
const name1 = document.getElementById("name1");
const name2 = document.getElementById("name2");
const name3 = document.getElementById("name3");
const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");
const score3 = document.getElementById("score3");
const whoseTurn = document.getElementById("whose-turn");
const rollButton = document.getElementById("roll-button");
const keepButton = document.getElementById("keep-button");
const diceTray = document.getElementById("dice-tray");
const total = [0,0,0];
const score = [0,0,0];
// Folowing taken from https://javascript.info/array-methods#shuffle-an-array

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
}
}

function colorPlayers () {
  switch (players [0]) {
    case "Amara":
      name1.style=amaraColor;
      break;
    case "Isabelle":
      name1.style=isabelleColor;
      break;
    case "Daddy":
      name1.style=daddyColor;
      break;
  }
  switch (players [1]) {
    case "Amara":
      name2.style=amaraColor;
      break;
    case "Isabelle":
      name2.style=isabelleColor;
      break;
    case "Daddy":
      name2.style=daddyColor;
      break;
  }
  switch (players [2]) {
    case "Amara":
      name3.style=amaraColor;
      break;
    case "Isabelle":
      name3.style=isabelleColor;
      break;
    case "Daddy":
      name3.style=daddyColor;
      break;
  }
}

function updateScoreboard () { 
  name1.innerHTML=players[0];
  name2.innerHTML=players[1];
  name3.innerHTML=players[2];
  score1.innerHTML=total[0];
  score2.innerHTML=total[1];
  score3.innerHTML=total[2];
  whoseTurn.innerHTML = players [player] + "'s turn";
}

function roll2d6 () {
  let rolls = [];
  for (let i = 0; i < 2; i ++) {
    rolls.push(Math.floor(Math.random()*6)+1);
  }
  return rolls;
}

function advancePlayer () {
    player ++;
    if (player > 2) {
      player = 0;
    }
}

function pigAlert (message, timeout) {
  setTimeout(() => alert (message), timeout);
}


shuffle(players);
colorPlayers();
let player = 0;
updateScoreboard ();

rollButton.onclick = () => {
  rolls = roll2d6();
  console.log(rolls);
  diceTray.innerHTML += players[player] + "  " + rolls[0] + " " + rolls[1] + " <br>";
  if (rolls[0] === 6 && rolls [1] === 6) {
    score[player] = 0;
    total[player] = 0;
    advancePlayer();
    updateScoreboard();
    pigAlert("Big Pig!", 50);
    
  }
  else if (rolls[0] === 6 || rolls [1] === 6) {
    score[player] = 0;
    advancePlayer();
    updateScoreboard();
    pigAlert("Pig!", 50);
  }
  else {
    score[player] += rolls [0] + rolls[1];
  }
}

keepButton.onclick = () => {
  if (score[player] > 0) {
    total[player] += score[player];
    score[player] = 0;
    diceTray.innerHTML = "";
    advancePlayer();
    updateScoreboard();
  }   

}

