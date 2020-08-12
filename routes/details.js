// search bar listener

// API data access

/* pokemonData.sprites.other["official-artwork"]["front-default"]
    pokemonData.id
    pokemonData.name 
    pokemonData.moves[i].move.name
*/


let listeningButton = document.querySelector('input[type=button]');
let searchBarField = document.querySelector('input');

listeningButton.addEventListener("click", sendRequest);
// searchBarField.addEventListener("keydown", sendRequest);

function sendRequest(eventType) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchBarField.value}`)

        .then((res) => res.json())

        .then((pokemonData) => {

            document.querySelector('div.descriptionImg img').src = pokemonData.sprites.other["official-artwork"]["front_default"];
            document.querySelector('.Name').textContent = pokemonData.name
            document.querySelector('.Number').textContent = `#${pokemonData.id}`

            document.querySelectorAll('h4').forEach((moveBox, index) => { moveBox.textContent = `${pokemonData.moves[index].move.name}` })


            /* pokemonData.sprites.other["official-artwork"]["front-default"]
                pokemonData.id
                pokemonData.name 
                pokemonData.moves[i].move.name
            */


        });
}
