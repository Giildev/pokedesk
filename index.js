document.addEventListener('DOMContentLoaded', () => {
    const showPoke = document.getElementById("Show-poke");
    pokemon();
    async function pokemon() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=964');
            const data = await response.json()
                const allPokemon = data.results;
            let pokemonShow = [];
            let random;
            for (i = 0; i < 10; i +=1) {
               do{
                  random = Math.floor(Math.random() * allPokemon.length)
               }while(pokemonShow.includes(allPokemon[random].name))
                pokemonShow.push(allPokemon[random].name)
            }
            for (const pokemon of pokemonShow) {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
                const data = await response.json()
                const digimon = document.createElement('div');
                digimon.classList.add('Pokemon');
                const digimonText = document.createElement('h1');
                const digimonImg = document.createElement('img')
                const pokeSprite = data.sprites.front_default;
                digimonImg.src = pokeSprite;
                const pokeName = data.name[0].toUpperCase() + data.name.substring(1);
                digimonText.textContent = pokeName
                digimon.appendChild(digimonImg)
                digimon.appendChild(digimonText)
                showPoke.appendChild(digimon)
            }
        } catch (err) {
            console.log(err);
        }
    };
});
