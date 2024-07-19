const pokemonList = document.getElementById('pokemon-list');
const pokemonDetails = document.getElementById('pokemon-details');
const detailContent = document.getElementById('detail-content');
const searchInput = document.getElementById('search-input');
const typeFilter = document.getElementById('type-filter');
const themeToggle = document.getElementById('theme-toggle');
const closeButton = document.querySelector('.close-button');

let allPokemon = [];

async function fetchPokemon() {
    try {
        const response = await fetch('https://project1-zeta-ochre.vercel.app/pokemon');
        const data = await response.json();
        allPokemon = data.pokemon;
        displayPokemon(allPokemon);
        populateTypeFilter(allPokemon);
    } catch (error) {
        console.error('Error fetching Pokémon data:', error);
    }
}

function displayPokemon(pokemonArray) {
    pokemonList.innerHTML = '';
    pokemonArray.forEach(pokemon => {
        const card = document.createElement('div');
        card.classList.add('pokemon-card');
        card.innerHTML = `
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <h3>${pokemon.name}</h3>
        `;
        card.addEventListener('click', () => showPokemonDetails(pokemon));
        pokemonList.appendChild(card);
    });
}

function showPokemonDetails(pokemon) {
    detailContent.innerHTML = `
        <h2>${pokemon.name}</h2>
        <img src="${pokemon.image}" alt="${pokemon.name}">
        <p><strong>Height:</strong> ${pokemon.height} m</p>
        <p><strong>Weight:</strong> ${pokemon.weight} kg</p>
        <p><strong>Types:</strong> ${pokemon.types.join(', ')}</p>
    `;
    pokemonDetails.style.display = 'block';
}

function populateTypeFilter(pokemonArray) {
    const types = new Set(pokemonArray.flatMap(pokemon => pokemon.types));
    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeFilter.appendChild(option);
    });
}

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredPokemon = allPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
    displayPokemon(filteredPokemon);
});

typeFilter.addEventListener('change', () => {
    const selectedType = typeFilter.value;
    const filteredPokemon = selectedType
        ? allPokemon.filter(pokemon => pokemon.types.includes(selectedType))
        : allPokemon;
    displayPokemon(filteredPokemon);
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

closeButton.addEventListener('click', () => {
    pokemonDetails.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === pokemonDetails) {
        pokemonDetails.style.display = 'none';
    }
});

fetchPokemon();
