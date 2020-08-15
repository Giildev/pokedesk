const search = document.getElementsByClassName("searchInput")[0];

const allPokemons = [];

getAllPokemos = async () => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=1000000`
    );
    const pokemons = response.json();
    return pokemons;
  } catch (error) {
    console.log("Exploto papu: ", error);
  }
};

getAllPokemos().then((data) => {
  data.results.map((pokemon) => {
    allPokemons.push(pokemon);
  });
});

search.addEventListener(
  "keyup",
  (event) => {
    pokemonMatch = allPokemons.filter((pokemon) => {
      return pokemon.name.includes(event.target.value);
    });

    pokemonMatch.map((data) => {
      console.log(data);
      var btn = document.createElement("pre"); // Create a <button> element
      btn.innerHTML = data.name; // Insert text
      document.body.appendChild(btn); // Append <button> to <body>
    });
  },
  false
);
