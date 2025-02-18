import React from 'react';
import './PokemonCard.css'; // Import the CSS file for styling

const PokemonCard = ({ pokemon }) => {
    const cardStyle = {
        backgroundColor: pokemon.color === 'fire' ? '#FFCCCB' : // Light red for fire
                         pokemon.color === 'water' ? '#ADD8E6' : // Light blue for water
                         pokemon.color === 'grass' ? '#98FB98' : // Light green for grass
                         '#FFFFFF' // Default white
    };

    return (
        <div className="pokemon-card" style={cardStyle}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h3>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
            <p>Height: {pokemon.height / 10} m</p>
            <p>Weight: {pokemon.weight / 10} kg</p>
            <p>Types: {pokemon.types.map(type => type.type.name).join(', ')}</p>
            <p>Abilities: {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
            <p>Base Experience: {pokemon.base_experience}</p>
        </div>
    );
};

export default PokemonCard; 