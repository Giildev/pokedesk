// Reduce verbosity

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


const listeningButton = $('#search');
const searchBarField = $('input');


// funcionalidad malandra con localstorage

document.addEventListener('DOMContentLoaded', () => {
 
   if(window.location.search.match(/id=(\d+)/) === null &&
      window.location.search.match(/id=(\D+)/) === null){
      window.location.search = `id=${localStorage.getItem('selected')}`
   }
   let grabbedId = window.location.search.match(/id=(\d+)/) === null ? 
     window.location.search.match(/id=(\D+)/)[1].toLowerCase() :
     window.location.search.match(/id=(\d+)/)[1];
     
  fetch(
      `https://pokeapi.co/api/v2/pokemon/${grabbedId}`
    )
      .then((res) => res.json())

      .then((pokemonData) => {
        const pokemonName =
          pokemonData.name[0].toUpperCase() + pokemonData.name.substring(1);

        $('div.descriptionImg img').src =
          pokemonData.sprites.other['official-artwork']['front_default'];
        $('div.descriptionImg img').alt = 'Pokemon \n Image';
        $('.Name').textContent = pokemonName;
        $('.Number').textContent = `#${pokemonData.id}`;
        const numberOfMoves = pokemonData.moves.length;
        const cardsToCreate = numberOfMoves < 3 ? numberOfMoves : 3;
        if (cardsToCreate === 0) return;
        for (let i = 0; i < cardsToCreate; i += 1) {
          const moveBox = document.createElement('div');
          moveBox.classList.add('card');
          const moveName = document.createElement('h4');
          const moveDescription = document.createElement('p');
          const move =
            pokemonData.moves[i].move.name[0].toUpperCase() +
            pokemonData.moves[i].move.name.substring(1);
          moveName.textContent = move;
          moveDescription.textContent = 'Move1 Move2 Move3';
          moveBox.appendChild(moveName);
          moveBox.appendChild(moveDescription);
          $('div.moveSet').appendChild(moveBox);
        }
      })
      .catch((error) => {
        alert(`${grabbedId} no es un pokemon válido`);
      });
  /* 
      pokemonData.sprites.other["official-artwork"]["front-default"]
      pokemonData.id
      pokemonData.name 
      pokemonData.moves[i].move.name
  */
});

// search bar listener

// API data access

/* pokemonData.sprites.other["official-artwork"]["front-default"]
    pokemonData.id
    pokemonData.name 
    pokemonData.moves[i].move.name
*/


listeningButton.addEventListener('click', sendRequest);
searchBarField.addEventListener("keydown", sendRequest);


function sendRequest(event) {

  console.log(event);

  if (event.type === 'click') {
    event.preventDefault();
  } else if (!(event.keyCode === 13)) {
    return;
  }
  fetch(
    `https://pokeapi.co/api/v2/pokemon/${searchBarField.value.toLowerCase()}`
  )
    .then((res) => res.json())
    .then((pokemonData) => {
     window.location.search = `id=${pokemonData.id}`;
     })
     .catch((error) => {
      alert(`${searchBarField.value} no es un pokemon válido`);
    });
}
