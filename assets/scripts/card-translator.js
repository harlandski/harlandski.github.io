const mtg = require('mtgsdk')

mtg.card.where({name: 'Гоблин-Цепехлест', language: 'russian'})
.then(results => {
    for (card of results) {
        console.log(card.name);
    }
})

const russianCardName = document.getElementById("russian-cardname");
const submit = document.getElementById("russian-button");
const englishCardName = document.getElementById("english-cardname");

const translateCardName = () => {
    const translationQuery = russianCardName.value;
    console.log(translationQuery);
    mtg.card.where({ name: translationQuery, language: 'russian' })
        .then(results => {
            for (card of results) {
                console.log(card.name);
            }
        })
}

submit.addEventListener('click', translateCardName);