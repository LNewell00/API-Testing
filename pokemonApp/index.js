// POKEMON APP

const pokemonForm = document.querySelector('.pokemonForm');
const pokemonInput = document.querySelector('.pokemonInput');
const pokemonContainer = document.querySelector('.pokemonContainer');
const apiBaseUrl = 'https://pokeapi.co/api/v2/';

pokemonForm.addEventListener("submit", async event => {

    event.preventDefault();

    const pokemon = pokemonInput.value;

    if(pokemon) {
        try {
            const pokemonData = await getPokemonData(pokemon);
            console.log(pokemonData);
            displayPokemonInfo(pokemonData);
        } catch (error) {
            console.log(error);
            displayError(error);
        }
    } else {
        displayError("Please enter a Pokémon name or ID.");
    }

});

async function getPokemonData(pokemon) {
    const url = apiBaseUrl.concat('pokemon/', pokemon);
    const response = await fetch(url);

    console.log(response);

    if(!response.ok) {
        throw new Error('Pokémon not found. Please check the name or ID and try again.');
    }

    return await response.json();
}

async function displayPokemonInfo(pokemonData) {

    const {
        name: name,
        sprites: {front_default: spriteUrl, back_default: backSpriteUrl},
        types: typesArray,
        abilities: abilitiesArray,
        height: height,
        weight: weight
    } = pokemonData;
    pokemonContainer.textContent = "";
    pokemonContainer.style.display = "flex";
    pokemonContainer.style.backgroundColor = await getPokemonColor(pokemonInput.value);

    const nameDisplay = document.createElement("h1");
    const spriteDisplay = document.createElement("img");
    const colorDisplay = document.createElement("p");
    const typeDisplay = document.createElement("p");
    const abilityDisplay = document.createElement("p");
    const heightDisplay = document.createElement("p");
    const weightDisplay = document.createElement("p");

    nameDisplay.textContent = name;
    spriteDisplay.src = spriteUrl;
    colorDisplay.textContent = `Color: ${await getPokemonColor(name)}`;
    typeDisplay.textContent = `Type: ${typesArray.map(typeInfo => typeInfo.type.name).join(", ")}`;
    abilityDisplay.textContent = `Abilities: ${abilitiesArray.map(abilityInfo => abilityInfo.ability.name).join(", ")}`;
    heightDisplay.textContent = `Height: ${height / 10} m`;
    weightDisplay.textContent = `Weight: ${weight / 10} kg`;

    nameDisplay.classList.add("nameDisplay");
    spriteDisplay.classList.add("spriteDisplay");
    colorDisplay.classList.add("colorDisplay");
    typeDisplay.classList.add("typeDisplay");
    abilityDisplay.classList.add("abilityDisplay");
    heightDisplay.classList.add("heightDisplay");
    weightDisplay.classList.add("weightDisplay");

    pokemonContainer.appendChild(nameDisplay);
    pokemonContainer.appendChild(spriteDisplay);
    pokemonContainer.appendChild(colorDisplay);
    pokemonContainer.appendChild(typeDisplay);
    pokemonContainer.appendChild(abilityDisplay);
    pokemonContainer.appendChild(heightDisplay);
    pokemonContainer.appendChild(weightDisplay);

}

async function getPokemonColor(pokemon) {
    try {
        const url = apiBaseUrl.concat('pokemon-species/', pokemon);
        const response = await fetch(url);

        if (!response.ok) return "lightgray";

        const data = await response.json();
        return data.color.name;
    } catch {
        return "lightgray";
    }
}


function displayError(message) {

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    
    pokemonContainer.textContent = "";
    pokemonContainer.style.display = "flex";
    pokemonContainer.appendChild(errorDisplay);
}