import { useState, useEffect } from "react";

export default function usePokemon() {
  const [pokemons, setPokemons] = useState([]);

  const getPokemons = async () => {
    try {
      const url = "https://pokeapi.co/api/v2/pokemon/";
      const response = await fetch(url);

      if (response.ok === false) {
        // forzar el llamado al error
        throw new Error("Error del Servidor");
      }

      const data = await response.json();
      console.log({ data });
      setPokemons(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return {
    pokemons,
  };
}
