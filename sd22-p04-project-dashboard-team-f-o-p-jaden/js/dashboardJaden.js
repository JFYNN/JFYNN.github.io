console.log('pokemon dashboard'); // Log 'pokemon dashboard' naar de console
let chart;
let allPokemon;
const allPokemonElement = document.querySelector('.all-pokemon');
const pokemonDataElement = document.querySelector('.pokemon-data');
const statsChart = document.querySelector('.stats-chart');
const weaknessesElement = document.querySelector('.weaknesses');
const strengthsElement = document.querySelector('.strengths');

// Gegevens ophalen vanuit poke.json en de showPokemon-functie aanroepen
fetch('/data/poke.json')
    .then(response => response.json())
    .then(jsonData => showPokemon(jsonData));

// Functie om alle Pokemon weer te geven
function showPokemon(allPokemon) {
    console.log(allPokemon); // Log de gegevens van alle Pokemon naar de console
    for (let i = 0; i < allPokemon.length; i++) {
        const pokemon = allPokemon[i];
        allPokemonElement.appendChild(createCard(pokemon));
    }
}

// Functie om een kaart voor een Pokemon te maken
function createCard(pokemon) {
    const col = document.createElement('div');
    col.classList.add('col-md-4');
    const card = document.createElement('div');
    card.classList.add('card');

    // Klikgebeurtenis toevoegen aan de kaart om Pokemon-gegevens op te halen
    card.addEventListener('click', function () {
        fetchPokemonData(pokemon);
    });

    const image = document.createElement('img');
    image.classList.add('card-img-top');
    image.src = pokemon.img;
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const h4 = document.createElement('h4');
    h4.classList.add('card-title');
    h4.textContent = pokemon.name;
    const p = document.createElement('p');
    p.classList.add('card-text');
    p.textContent = pokemon.type;
    p.textContent = 'level:' + pokemon.level;

    col.appendChild(card);
    card.appendChild(image);
    card.appendChild(cardBody);
    cardBody.appendChild(h4);
    cardBody.appendChild(p);

    return col;
}

// Functie om Pokemon-gegevens op te halen van de PokeAPI
function fetchPokemonData(pokemon) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        .then(response => response.json())
        .then(jsonData => showPokemonData(jsonData, pokemon));
}

// Functie om Pokemon-gegevens weer te geven en een grafiek te maken
function showPokemonData(jsonData, pokemon) {
    console.log(jsonData); // Log de gegevens van de Pokemon van de PokeAPI naar de console
    const labels = [];
    const data = [];
    let lowestStat = Infinity;
    for (let i = 0; i < jsonData.stats.length; i++) {
        const stat = jsonData.stats[i];
        labels.push(stat.stat.name);
        data.push(stat.base_stat);
        console.log(stat); // Log de statistiek van de Pokemon naar de console
        if (stat.base_stat < lowestStat) {
            lowestStat = stat.base_stat;
        }
    }
    const highestStat = getHighestStat(jsonData.stats);
    pokemonDataElement.innerHTML = pokemon.name + ' hoogste stat: ' + highestStat + ' laagste stat: ' + lowestStat;
    console.log(highestStat); // Log de hoogste statistiek naar de console
    console.log(data); // Log de gegevens van de statistieken naar de console
    console.log(labels); // Log de labels van de statistieken naar de console
    if (chart) {
        chart.destroy();
    }
    chart = createChart(labels, data);
    showWeaknesses(jsonData.types);
    showStrengths(jsonData.types);
}

// Functie om de hoogste statistiek van een Pokemon te krijgen
function getHighestStat(stats) {
    let highStat = 0;
    for (let i = 0; i < stats.length; i++) {
        const stat = stats[i];
        if (stat.base_stat > highStat) {
            highStat = stat.base_stat;
        }
    }
    return highStat;
}

// Functie om een grafiek te maken met de gegeven labels en data
function createChart(labels, data) {
    return new Chart(statsChart, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '# stats',
                data: data,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Functie om zwaktes van de Pokémon weer te geven
function showWeaknesses(types) {
    weaknessesElement.innerHTML = '';
    for (let i = 0; i < types.length; i++) {
        const type = types[i].type.name;
        const weaknesses = getWeaknesses(type);
        weaknessesElement.innerHTML += `<p>Zwaktes tegen ${type}: ${weaknesses.join(', ')}</p>`;
    }
}

// Functie om sterke types van de Pokémon weer te geven
function showStrengths(types) {
    strengthsElement.innerHTML = '';
    for (let i = 0; i < types.length; i++) {
        const type = types[i].type.name;
        const strengths = getStrengths(type);
        strengthsElement.innerHTML += `<p>Sterk tegen ${type}: ${strengths.join(', ')}</p>`;
    }
}

// Functie om zwaktes van een type op te halen
function getWeaknesses(type) {
    const weaknesses = {
        normal: ['Fighting'],
        fighting: ['Flying', 'Psychic', 'Fairy'],
        flying: ['Rock', 'Electric', 'Ice'],
        poison: ['Ground', 'Psychic'],
        ground: ['Water', 'Grass', 'Ice'],
        rock: ['Fighting', 'Ground', 'Steel', 'Water', 'Grass'],
        bug: ['Flying', 'Rock', 'Fire'],
        ghost: ['Ghost', 'Dark'],
        steel: ['Fighting', 'Ground', 'Fire'],
        fire: ['Ground', 'Rock', 'Water'],
        water: ['Grass', 'Electric'],
        grass: ['Flying', 'Poison', 'Bug', 'Fire', 'Ice'],
        electric: ['Ground'],
        psychic: ['Bug', 'Ghost', 'Dark'],
        ice: ['Fighting', 'Rock', 'Steel', 'Fire'],
        dragon: ['Ice', 'Dragon', 'Fairy'],
        dark: ['Fighting', 'Bug', 'Fairy'],
        fairy: ['Poison', 'Steel'],
    };

    return weaknesses[type] || [];
}

// Functie om sterke types van een type op te halen
function getStrengths(type) {
    const strengths = {
        normal: [],
        fighting: ['Normal', 'Rock', 'Steel', 'Ice', 'Dark'],
        flying: ['Fighting', 'Bug', 'Grass'],
        poison: ['Grass', 'Fairy'],
        ground: ['Poison', 'Rock', 'Steel', 'Fire', 'Electric'],
        rock: ['Flying', 'Bug', 'Fire', 'Ice'],
        bug: ['Grass', 'Psychic', 'Dark'],
        ghost: ['Ghost', 'Psychic'],
        steel: ['Rock', 'Ice', 'Fairy'],
        fire: ['Bug', 'Steel', 'Grass', 'Ice'],
        water: ['Ground', 'Rock', 'Fire'],
        grass: ['Ground', 'Rock', 'Water'],
        electric: ['Flying', 'Water'],
        psychic: ['Fighting', 'Poison'],
        ice: ['Flying', 'Ground', 'Grass', 'Dragon'],
        dragon: ['Dragon'],
        dark: ['Ghost', 'Psychic'],
        fairy: ['Fighting', 'Dragon', 'Dark'],
    };

    return strengths[type] || [];
}

function filterPokemonByType() {
    const typeInput = document.getElementById('type-input').value.toLowerCase();
    const filteredPokemon = allPokemon.filter(pokemon => {
        return pokemon.type.toLowerCase() === typeInput;
    });

    allPokemonElement.innerHTML = '';
    for (let i = 0; i < filteredPokemon.length; i++) {
        const pokemon = filteredPokemon[i];
        allPokemonElement.appendChild(createCard(pokemon));
    }
}

function showPokemon(jsonData) {
    allPokemon = jsonData;
    console.log(allPokemon);
    for (let i = 0; i < allPokemon.length; i++) {
        const pokemon = allPokemon[i];
        allPokemonElement.appendChild(createCard(pokemon));
    }
}

console.log('Einde van de code'); // Log het einde van de code naar de console


