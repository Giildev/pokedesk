document.addEventListener('DOMContentLoaded', () => {
    const showPoke = document.getElementById("Show-poke");

     const pokeSearch = document.getElementById('search');
             
            pokeSearch.addEventListener('click', function() {
            const pokeName = document.getElementsByClassName('searchBar')[0].firstElementChild.firstElementChild.value
            localStorage.setItem('selected', pokeName.toLowerCase())
             window.open('./details.html', '_self');
            })
            
    
    
    pokemon();
    async function pokemon() {
        try {
           
            let pokemonShow = [];
            let random;
            for (i = 0; i < 10; i +=1) {
               do{
                  random = Math.floor((Math.random() * 806) + 1)
               }while(pokemonShow.includes(random))
                pokemonShow.push(random)
            }
            
            for (const pokemon of pokemonShow) {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
                const data = await response.json()
                const digimon = document.createElement('div');
                digimon.classList.add('Pokemon');
                const digimonText = document.createElement('h1');
                const digimonImg = document.createElement('img')
                const pokeSprite = `https://pokeres.bastionbot.org/images/pokemon/${data.id}.png`
                //data.sprites.front_default;
                digimonImg.src = pokeSprite;
                const pokeName = data.name[0].toUpperCase() + data.name.substring(1);
                digimonText.textContent = pokeName
                digimon.appendChild(digimonImg)
                digimon.appendChild(digimonText)
                digimon.addEventListener('click', function () {
                    localStorage.setItem('selected', pokeName.toLowerCase())
                    window.open('./details.html', '_self');
                })
                showPoke.appendChild(digimon)

            }
           

        } catch (err) {
            console.log(err);
        }
    };
});
