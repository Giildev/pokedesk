document.addEventListener('DOMContentLoaded', () => {
  const showPoke = document.getElementById('Show-poke');

  const pokeSearch = document.getElementById('search');

  pokeSearch.addEventListener('click', function () {
    const pokeName = document.getElementsByClassName('searchBar')[0]
      .firstElementChild.firstElementChild.value;
    localStorage.setItem('selected', pokeName.toLowerCase());
    window.open('./details.html', '_self');
  });

  pokemon();
  async function pokemon() {
    try {
      let pokemonShow = [];
      for (i = 1; i < 11; i += 1) {
          pokemonShow.push(i);
      }

      for (const pokemon of pokemonShow) {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon}`
        );
        const data = await response.json();
        const pokemonContainer = document.createElement('div');
        pokemonContainer.id = 'pokemonContainer';
        const pokemons = document.createElement('div');
        pokemons.classList.add('Pokemon');
        const pokemonText = document.createElement('h3');
        const pokemonImg = document.createElement('img');
        const descriptionBtn = document.createElement('button');
        const descriptionImg = document.createElement('i');
        descriptionBtn.type = 'button';
        descriptionImg.setAttribute('class', 'fas fa-plus-circle fa-3x');
        descriptionBtn.appendChild(descriptionImg);
        const pokeSprite = `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`;
        //data.sprites.front_default;
        pokemonImg.src = pokeSprite;
        const pokeName = data.name[0].toUpperCase() + data.name.substring(1);
        pokemonText.textContent = pokeName;
        pokemonContainer.appendChild(pokemonImg);
        pokemons.appendChild(pokemonContainer);
        pokemons.appendChild(pokemonText);
        pokemons.appendChild(descriptionBtn);
        showPoke.appendChild(pokemons);
        pokemons.addEventListener('click', function () {
          localStorage.setItem('selected', pokeName.toLowerCase());
          window.open('./details.html', '_self');
        });
        showPoke.appendChild(pokemons);
      }
    } catch (err) {
      console.log(err);
    }
  }
});
