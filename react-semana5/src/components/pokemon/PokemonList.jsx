import usePokemon from "@/hooks/usePokemon";
import { Link } from "react-router-dom";

export default function PokemonList() {
  const { pokemons } = usePokemon();

  return (
    <section className="pokemons-container">
      {pokemons.map((pokemon, index) => (
        <Link
          to={`/pokemon/${pokemon.name}`}
          key={index}
          className="border border-gray-300 p-5 rounded-md flex flex-col items-center"
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
              index + 1
            }.svg`}
            alt={pokemon.name}
            width={200}
          />
          <h3 className="text-center capitalize text-xl font-semibold">
            {pokemon.name}
          </h3>
        </Link>
      ))}
    </section>
  );
}
