const mtg = require('mtgsdk')

//This part works, apart from the form
mtg.card.where({name: 'Гоблин-Цепехлест', language: 'russian'})
.then(results => {
    for (card of results) {
        console.log(card.name);
    }
})

const russianCardName = document.getElementById("russian-cardname");
const submit = document.getElementById("russian-button");
// This is not used yet, but in the end will be used to output to a div with this id
const englishCardName = document.getElementById("english-cardname");

const translateCardName = () => {
    const translationQuery = russianCardName.value;
    // This console log works, showing that the function is being called
    console.log(translationQuery);
    // None of this seems to work:
    mtg.card.where({ name: translationQuery, language: 'russian' })
        .then(results => {
            for (card of results) {
                console.log(card.name);
            }
        })
}

submit.addEventListener('click', translateCardName);