import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Detail() {
  const { pokemonName } = useParams();

  const fetchPokemonData = async () => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Error en el servidor");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  return (
    <div>
      <h1 className="text-6xl">{pokemonName}</h1>
    </div>
  );
}
