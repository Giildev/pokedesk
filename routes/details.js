// funcionalidad malandra con localstorage
document.addEventListener('DOMContentLoaded', () => {

    if (localStorage.getItem('selected')) {

        fetch(`https://pokeapi.co/api/v2/pokemon/${localStorage.getItem('selected')}`)

            .then((res) => res.json())

            .then((pokemonData) => {
                const pokemonName = pokemonData.name[0].toUpperCase() + pokemonData.name.substring(1)
                
                $('div.descriptionImg img').src = pokemonData.sprites.other["official-artwork"]["front_default"];
                $('.Name').textContent = pokemonName
                $('.Number').textContent = `#${pokemonData.id}`
                const numberOfMoves = pokemonData.moves.length
                const cardsToCreate = numberOfMoves < 3 ? numberOfMoves : 3;
                if(cardsToCreate === 0)return;
                for(let i = 0; i < cardsToCreate; i+=1){
                    const moveBox = document.createElement('div')
                    moveBox.classList.add("card")
                    const moveName = document.createElement('h4')
                    const moveDescription = document.createElement('p')
                    const move = pokemonData.moves[i].move.name[0].toUpperCase() + pokemonData.moves[i].move.name.substring(1);
                    moveName.textContent = move;
                    moveDescription.textContent = 'Move1 Move2 Move3'
                    moveBox.appendChild(moveName)
                    moveBox.appendChild(moveDescription)
                    $('div.moveSet').appendChild(moveBox) 
                } 
            })
                   
                   
                   
    }
                /* 
                    pokemonData.sprites.other["official-artwork"]["front-default"]
                    pokemonData.id
                    pokemonData.name 
                    pokemonData.moves[i].move.name
                */
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
             const pokemonName = pokemonData.name[0].toUpperCase() + pokemonData.name.substring(1)
                
                $('div.descriptionImg img').src = pokemonData.sprites.other["official-artwork"]["front_default"];
                $('.Name').textContent = pokemonName
                $('.Number').textContent = `#${pokemonData.id}`
                const cardToRemove =  $('div.moveSet').children.length
                for(let i = 0; i < cardToRemove; i += 1){
                   
                   $('div.moveSet').removeChild($('div.moveSet').firstChild)
                   
                }
                const numberOfMoves = pokemonData.moves.length
                const cardsToCreate = numberOfMoves < 3 ? numberOfMoves : 3;
                if(cardsToCreate === 0)return;
                for(let i = 0; i < cardsToCreate; i+=1){
                    const moveBox = document.createElement('div')
                    moveBox.classList.add("card")
                    const moveName = document.createElement('h4')
                    const moveDescription = document.createElement('p')
                    const move = pokemonData.moves[i].move.name[0].toUpperCase() + pokemonData.moves[i].move.name.substring(1);
                    moveName.textContent = move;
                    moveDescription.textContent = 'Move1 Move2 Move3'
                    moveBox.appendChild(moveName)
                    moveBox.appendChild(moveDescription)
                   // moveBox.textContent = 'Move1 Move2 Move3'
                   $('div.moveSet').appendChild(moveBox) 
                   
                   const searchMove= pokemonData.moves[0].move.url;
                   fetch('searchMove')
                    .then(res => res.json())
                     .then(moveData => {
                   console.log(moveData);
                     });

                     const searchMove= pokemonData.moves[1].move.url;
                   fetch('searchMove')
                    .then(res => res.json())
                     .then(moveData => {
                   console.log(moveData);
                     });

                     const searchMove= pokemonData.moves[2].move.url;
                   fetch('searchMove')
                    .then(res => res.json())
                     .then(moveData => {
                   console.log(moveData);
                     });
                                                                                //hasta aca tengo los tres movimientos 
                      if(searchMove.length >2){
                        const mov1 = pokemonData.moves[0].move.url
                        const mov2 = pokemonData.moves[1].move.url
                        const mov3 = pokemonData.moves[2].move.url
                    };
                    fetch('pokemonData.moves[0].move.url')
                    .then(res => res.json())
                     .then(moveData => {
                        document.createElement('p');
                     });

                     fetch(' pokemonData.moves[1].move.url')
                     .then(res => res.json())
                      .then(moveData => {
                         document.createElement('p');
                        });

                        fetch('pokemonData.moves[2].move.url')
                     .then(res => res.json())
                      .then(moveData => {
                         document.createElement('p');
                        });
                        const mov1 = document.createElement('p')
                        const mov2 = document.createElement('p')
                        const mov3 = document.createElement('p')
                        } 
            /* 
                pokemonData.sprites.other["official-artwork"]["front-default"]
                pokemonData.id
                pokemonData.name 
                pokemonData.moves[i].move.name
            */


        })

        .catch((error) => { alert(`${searchBarField.value} no es un pokemon válido`) });
}
