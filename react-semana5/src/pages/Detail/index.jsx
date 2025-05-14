import { useParams } from "react-router-dom";
import usePokemon from "../../hooks/usePokemon";
import PokemonItem from "../../components/pokemon/PokemonItem";

const colors = {
  grass: "bg-green-500",
  fire: "bg-red-500",
  water: "bg-blue-500",
  bug: "bg-lime-500",
  poison: "bg-purple-500",
  electric: "bg-yellow-400",
  normal: "bg-gray-400",
  ground: "bg-amber-700",
  fairy: "bg-pink-400",
  psychic: "bg-pink-600",
  fighting: "bg-orange-700",
  rock: "bg-yellow-700",
  ghost: "bg-indigo-700",
  ice: "bg-cyan-300",
  dragon: "bg-indigo-900",
  steel: "bg-gray-500",
  dark: "bg-zinc-800",
  flying: "bg-sky-400",
};

export default function Detail() {
  const { pokemonName } = useParams();

  const { pokemon } = usePokemon(pokemonName);

  return (
    <>
      {pokemon ? (
        <section
          className={`${colors[pokemon.types[0].type.name]} min-h-screen`}
        >
          <PokemonItem pokemon={pokemon} />
        </section>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}
