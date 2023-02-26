const endpoint = 'https://pokeapi.co/api/v2/pokemon/';

const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const buttonProx = document.querySelector('.btn_prox');
const buttonPrev = document.querySelector('.btn_prev');

let searchPokemon = 1;

const fetchpokemon = async (pokemon) => {

  const APIResponse = await fetch(`${endpoint}${pokemon}`);
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }

};

const renderPokemon = async (pokemon) => {

  pokemonName.innerHTML = "Carregando ...";
  pokemonNumber.innerHTML = '';
  const data = await fetchpokemon(pokemon);

  // render pokemon data: number/id and name
  if (data) {
    pokemonNumber.innerHTML = data.id;
    searchPokemon = data.id;
    pokemonName.innerHTML = data.name;
    pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
    pokemonImage.src = data.sprites.front_default;
  } else {
    pokemonNumber.innerHTML = 0;
    searchPokemon = 0;
    pokemonName.innerHTML = "Ditto!!??";
    // pokemonImage.style.display = "none";
    pokemonImage.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/132.gif';
  }

};

// listener do formulario
form.addEventListener('submit', (event) => {

  // desabilita a ação padrão do form
  event.preventDefault();
  // chamda da funcao que renderiza os dados no html
  renderPokemon(input.value.toLowerCase());
  input.value = "";

});

// listeners dos botoes
buttonPrev.addEventListener('click', () => {

  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }

});

buttonProx.addEventListener('click', () => {

  searchPokemon += 1;
  renderPokemon(searchPokemon);

});

renderPokemon(searchPokemon);