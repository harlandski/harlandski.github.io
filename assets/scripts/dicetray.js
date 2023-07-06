const rollD = sides => Math.floor(Math.random()*sides)+1;

const d4 = document.getElementById('d4');
// Weirdly the page worked without these definitions below
const d6 = document.getElementById('d6');
const d8 = document.getElementById('d8');
const d10 = document.getElementById('d10');
const d12 = document.getElementById('d12');
const d20 = document.getElementById('d20');

const reset = document.getElementById('reset');


const dicetray = document.getElementById('dicetray');

d4.onclick = function () {
    let roll = rollD(4);
    dicetray.innerHTML += roll + " ";
}

d6.onclick = function () {
    let roll = rollD(6);
    dicetray.innerHTML += roll + " ";
}

d8.onclick = function () {
    let roll = rollD(8);
    dicetray.innerHTML += roll + " ";
}

d10.onclick = function () {
    let roll = rollD(10);
    if (roll === 10) {
        roll = 0;
    }
    dicetray.innerHTML += roll + " ";
}

d12.onclick = function () {
    let roll = rollD(12);
    dicetray.innerHTML += roll + " ";
}

d20.onclick = function () {
    let roll = rollD(20);
    dicetray.innerHTML += roll + " ";
}

reset.onclick = function () {
    dicetray.innerHTML = "";
}
