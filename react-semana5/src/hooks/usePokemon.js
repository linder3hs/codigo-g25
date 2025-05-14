import { useState, useEffect } from "react";

export default function usePokemon(pokemonName = "") {
  // Lista de pokemones (Home)
  const [pokemons, setPokemons] = useState([]);
  // Detalle del pokemon (Detail)
  const [pokemon, setPokemon] = useState(null);

  const getPokemons = async () => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
      const response = await fetch(url);

      if (response.ok === false) {
        // forzar el llamado al error
        throw new Error("Error del Servidor");
      }

      const data = await response.json();
      if (pokemonName === "") {
        setPokemons(data.results);
      } else {
        setPokemon(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return {
    pokemons,
    pokemon,
  };
}
