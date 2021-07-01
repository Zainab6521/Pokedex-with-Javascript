var poke_container = document.getElementById('poke-container')
var pokemon_count = 150
var colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric:'#FCF7DE',
    water:'#DEF3FD',
    ground:'#f4e7da',
    rock:'#d5d5d4',
    fairy:'#fceaff',
    poison:'#98d7a5',
    bug:'#f8d5a3',
    dragon:'#97b3e6',
    psychic:'#eaedal',
    flying:'#F5F5F5',
    fighting:'#E6E0D4',
    normal:'#F5F5F5',
}

var main_types = Object.keys(colors)

var fetchPokemons = async () => {
    for(let i = 1; i <= pokemon_count; i++){
        await getPokemon(i)
    }
}

var getPokemon = async (id) => {
    var url = `https://pokeapi.co/api/v2/pokemon/${id}`
    var res = await fetch(url)
    var data = await res.json()
    createPokemoncard(data)
} 

var createPokemoncard = (pokemon) => {
    var pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    var name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    var id = pokemon.id.toString().padStart(3 , '0')

    var poke_types = pokemon.types.map(type => type.type.name)
    var type = main_types.find(type => poke_types.indexOf(type) > -1)
    var color = colors[type]
    pokemonEl.style.backgroundColor = color

    var pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png" alt="">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Types <span>${type}</span></small>
    </div>
    `

    pokemonEl.innerHTML = pokemonInnerHTML
    poke_container.appendChild(pokemonEl)
}

fetchPokemons()