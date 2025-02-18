import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonList from "./components/PokemonList";
import "./App.css";
import pokemonImage from "./pokemon-23.svg";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const initialDisplayCount = 5;

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=100"
      );
      const pokemonData = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const pokemonDetail = await axios.get(pokemon.url);
          return {
            ...pokemonDetail.data,
            color: pokemonDetail.data.types[0].type.name,
          };
        })
      );
      setPokemons(pokemonData);
      setFilteredPokemons(
        pokemonData
          .sort(() => Math.random() - 0.5)
          .slice(0, initialDisplayCount)
      );
      setLoading(false);
    };
    fetchPokemons();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(value)
    );
    setFilteredPokemons(filtered);
  };

  return (
    <div className="App">
      <img src={pokemonImage} alt="Pokémon" className="pokemon-image" />
      <h1 className="pokemon-title">Pokémon Search</h1>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={handleSearch}
      />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <PokemonList pokemons={filteredPokemons} />
      )}
    </div>
  );
};

export default App;
