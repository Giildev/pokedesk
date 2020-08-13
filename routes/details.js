// funcionalidad malandra con localstorage
document.addEventListener('DOMContentLoaded', () => {

    if (localStorage.getItem('selected')) {

        fetch(`https://pokeapi.co/api/v2/pokemon/${localStorage.getItem('selected')}`)

            .then((res) => res.json())

            .then((pokemonData) => {

                $('div.descriptionImg img').src = pokemonData.sprites.other["official-artwork"]["front_default"];
                $('.Name').textContent = pokemonData.name
                $('.Number').textContent = `#${pokemonData.id}`

                $$('h4').forEach((moveBox, index) => { moveBox.textContent = `${pokemonData.moves[index].move.name}` })


                /* 
                    pokemonData.sprites.other["official-artwork"]["front-default"]
                    pokemonData.id
                    pokemonData.name 
                    pokemonData.moves[i].move.name
                */


            })




    }

})

// search bar listener

// API data access

/* pokemonData.sprites.other["official-artwork"]["front-default"]
    pokemonData.id
    pokemonData.name 
    pokemonData.moves[i].move.name
*/


// Reduce verbosity

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


const listeningButton = $('#search');
const searchBarField = $('input');

listeningButton.addEventListener("click", sendRequest);
// searchBarField.addEventListener("keydown", sendRequest); TODO

function sendRequest(eventType) {

    eventType.preventDefault()

    // TODO diferentiation of procedure by eventType

    fetch(`https://pokeapi.co/api/v2/pokemon/${searchBarField.value.toLowerCase()}`)

        .then((res) => res.json())

        .then((pokemonData) => {

            $('div.descriptionImg img').src = pokemonData.sprites.other["official-artwork"]["front_default"];
            $('.Name').textContent = pokemonData.name
            $('.Number').textContent = `#${pokemonData.id}`

            $$('h4').forEach((moveBox, index) => { moveBox.textContent = `${pokemonData.moves[index].move.name}` })


            /* 
                pokemonData.sprites.other["official-artwork"]["front-default"]
                pokemonData.id
                pokemonData.name 
                pokemonData.moves[i].move.name
            */


        })

        .catch((error) => { alert(`${searchBarField.value} no es un pokemon válido`) });
}
