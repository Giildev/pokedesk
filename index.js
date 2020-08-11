// search bar listener

// API data access

/* pokemon.sprite.other["official-artwork"]["front-default"]
    pokemon.id
    pokemon.name 
    pokemon.moves[i].move.name
*/

let listeningButton; // = document.querySelector(PENDING);
let searchBarField; // = document.querySelector(PENDING)  ;

listeningButton.addEventListener("click", sendRequest);
// searchBarField.addEventListener("keydown", sendRequest);

function sendRequest(eventType) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchBarField.value}`)

        .then((res) => res.json())

        .then((pokemonData) => {

            // document.querySelector(PENDING).src = pokemon.sprite.other["official-artwork"]["front-default"];
            // document.querySelector(PENDING).src = `#${pokemon.id pokemon.name}`
            // document.querySelectorAll(PENDING).forEach((moveBox, index) => { moveBox.textContent = `${pokemon.moves[index].move.name}` })  


            /* pokemon.sprite.other["official-artwork"]["front-default"]
                pokemon.id
                pokemon.name 
                pokemon.moves[i].move.name
            */


        });
}
