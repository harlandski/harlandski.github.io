const d6 = () => Math.floor(Math.random()*6)+1;
const button = document.getElementById("button");
const result = document.getElementById("result");

button.onclick = () => {
    let roll = d6();
    result.innerHTML = roll;
}

button.onmouseenter = () => {
    button.style.backgroundColor = 'cyan';
}

button.onmouseleave = () => {
    button.style.backgroundColor = 'cadetblue';
}
