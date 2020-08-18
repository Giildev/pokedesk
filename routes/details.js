// Reduce verbosity

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const listeningButton = $("#search");
const searchBarField = $("input");

// funcionalidad malandra con localstorage

document.addEventListener("DOMContentLoaded", () => {
  if (
    window.location.search.match(/id=(\d+)/) === null &&
    window.location.search.match(/id=(\D+)/) === null
  ) {
    window.location.search = `id=${localStorage.getItem("selected")}`;
  }
  let grabbedId =
    window.location.search.match(/id=(\d+)/) === null
      ? window.location.search.match(/id=(\D+)/)[1].toLowerCase()
      : window.location.search.match(/id=(\d+)/)[1];

  fetch(`https://pokeapi.co/api/v2/pokemon/${grabbedId}`)
    .then((res) => res.json())

    .then((pokemonData) => {
      pokemonData = attachGames(pokemonData);
      console.log("pokemonData", pokemonData);

      const pokemonName =
        pokemonData.name[0].toUpperCase() + pokemonData.name.substring(1);

      $("div.descriptionImg img").src =
        pokemonData.sprites.other["official-artwork"]["front_default"];
      $("div.descriptionImg img").alt = "Pokemon \n Image";
      $(".Name").textContent = pokemonName;
      $(".Number").textContent = `#${pokemonData.id}`;
      const numberOfMoves = pokemonData.moves.length;
      const cardsToCreate = numberOfMoves < 3 ? numberOfMoves : 3;
      if (cardsToCreate === 0) return;
      for (let i = 0; i < cardsToCreate; i += 1) {
        const moveBox = document.createElement("div");
        moveBox.classList.add("card");
        const moveName = document.createElement("h4");
        const moveDescription = document.createElement("p");
        const move =
          pokemonData.moves[i].move.name[0].toUpperCase() +
          pokemonData.moves[i].move.name.substring(1);
        moveName.textContent = move;
        const url = pokemonData.moves[i].move.url;
        console.log(url);
        fetch(url)
          .then((res) => res.json())
          .then((moveData) => {
            console.log(moveData);
            const acc = moveData.accuracy;
            const flavorText = moveData.flavor_text_entries[0].flavor_text;
            const damageClass = moveData.damage_class.name;
            const effect = moveData.effect_entries[0].effect;
            const power = moveData.power;
            const pp = moveData.pp;
            const priority = moveData.priority;
            const target = moveData.target.name;
            const type = moveData.type.name;
            moveDescription.innerHTML = `
           <p>${flavorText}</p>
           <p>Effect: ${effect}</p>
          <p>Accuaricy:${acc}</p>
         <p>Damage class: ${damageClass}</p>
          <p>Power: ${power}</p>
          <p>Priority; ${priority}</p>
          <p>Target: ${target}</p>
          <p>Type: ${type}</p>
          `;
          })
          .catch((error) => {
            console.log(error);
          });
        moveBox.appendChild(moveName);
        moveBox.appendChild(moveDescription);
        $("div.moveSet").appendChild(moveBox);
      }

      const appearances = document.createElement("div");

      pokemonData.games.forEach((game) => {
        let gameNode = document.createElement("h5");
        gameNode.textContent = game;
        appearances.appendChild(gameNode);
      });

      document.body.appendChild(appearances);
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

listeningButton.addEventListener("click", sendRequest);
searchBarField.addEventListener("keydown", sendRequest);

function sendRequest(event) {
  if (event.type === "click") {
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

function attachGames(pokemon) {
  let genIndexes = {
    gen1: 0,
    gen2: 3,
    gen3: 6,
    gen4: 11,
    gen5: 16,
    gen6: 20,
    gen7: 24,
    gen8: 28,
  };

  let games = [
    "red",
    "green",
    "yellow",
    "silver",
    "gold",
    "crystal",
    "ruby",
    "saphire",
    "emerald",
    "fire red",
    "leaf green",
    "pearl",
    "diamond",
    "platinum",
    "soul silver",
    "heart gold",
    "white",
    "black",
    "white 2",
    "black 2",
    "x",
    "y",
    "omega ruby",
    "alpha saphire",
    "sun",
    "moon",
    "ultra sun",
    "ultra moon",
    "sword",
    "shield",
  ];

  if (pokemon.id < 152) {
    pokemon.games = games.slice(genIndexes.gen1);
  } else if (pokemon.id >= 152 && pokemon.id < 252) {
    pokemon.games = games.slice(genIndexes.gen2);
  } else if (pokemon.id >= 252 && pokemon.id < 387) {
    pokemon.games = games.slice(genIndexes.gen3);
  } else if (pokemon.id >= 387 && pokemon.id < 494) {
    pokemon.games = games.slice(genIndexes.gen4);
  } else if (pokemon.id >= 494 && pokemon.id < 650) {
    pokemon.games = games.slice(genIndexes.gen5);
  } else if (pokemon.id >= 650 && pokemon.id < 722) {
    pokemon.games = games.slice(genIndexes.gen6);
  } else if (pokemon.id >= 722 && pokemon.id < 810) {
    pokemon.games = games.slice(genIndexes.gen7);
  } else {
    pokemon.games = games.slice(genIndexes.gen8);
  }

  return pokemon;
}
