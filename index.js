document.addEventListener('DOMContentLoaded',() => {

const showPoke = document.getElementById("Show-poke");
pokemon();
async function pokemon(){

try{

   const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=964');
   const data = await response.json()
   const allPokemon =  data.results;
   const pokemonShow = allPokemon.map(element=>{
        if(element.name ==='bulbasaur' || element.name==='caterpie' || element.name ==='gyarados' ){return element.name}    
   }).filter(element=> element !== undefined)

   for (const pokemon of pokemonShow){
     const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      const data = await response.json()
      const digimon = document.createElement('div');
      const digimonImg = document.createElement('img')
      const pokeSprite = data.sprites.front_shiny;
      digimonImg.src = pokeSprite;
      const pokeName = data.name[0].toUpperCase()+ data.name.substring(1);
      digimon.textContent = pokeName
      digimon.appendChild(digimonImg)
      showPoke.appendChild(digimon)
      
      
   }




}
catch(err){
console.log(err);
}
};



});