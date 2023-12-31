const pokeApi = {}

   

    pokeApi.getPokemonDetail = (pokemon) => {
        return fetch(pokemon.url)
                .then((response) => response.json())
    }
    pokeApi.getPokemons = (offset = 0, limit = 8) => {
        const url =`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    
        return fetch(url)
        .then((response) => response.json())
        .then((json) => json.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => {
            return pokemonsDetails;
        })
    }

    




