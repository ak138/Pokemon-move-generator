async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        
        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const pokemonID = data.id;
        const imgElement = document.getElementById("pokemonSprite");
        const iDElement = document.getElementById("PokemonId");
        const movesElement = document.getElementById("moves");

        
        imgElement.src = pokemonSprite;
        iDElement.textContent = `ID: ${pokemonID}`;

        imgElement.style.display = "block";

        const moves = data.moves.map(move => move.move.name);
        const randomMoves = getRandomMoves(moves, 4);
      
        movesElement.innerHTML = "<b>Random Moves:</b><br>";
        randomMoves.forEach(move => {
            movesElement.innerHTML += `${move}<br>`;
        });
    } catch (error) {
        console.error(error);
    }
}

function getRandomMoves(moves, count) {
    const randomMoves = [];
    const movesCopy = [...moves];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * movesCopy.length);
        randomMoves.push(movesCopy[randomIndex]);
        movesCopy.splice(randomIndex, 1);
    }
    return randomMoves;
}
