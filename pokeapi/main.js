const pokemonList = document.getElementById('pokemonList')

const loadMoreButton = document.getElementById('loadMoreButton')

const limit = 8
let offset = 0

function pegatipos(pokemonTypes){
    return pokemonTypes.map((typeSlot) => typeSlot.type.name);
}
function pegaPrimeiro(pokemonTypes){
    return pokemonTypes[0].type.name;
}
function convertPokemonToHtml(pokemon){
    return `
            <div class="full-screen">
                <div class="${pegaPrimeiro(pokemon.types)} generaldiv">

                    <img src='${pokemon.sprites.front_shiny}'>

                    <p>${pegatipos(pokemon.types).join(' ')}</p>

                    <h3> ${pokemon.name} <h3>

                </div>
            </div>
    `
}


function loadPokemons(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToHtml).join('');
        pokemonList.innerHTML += newHtml;
    })
}

loadPokemons(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    loadPokemons(offset, limit)
})