import { useParams } from "react-router-dom";
import usePokemon from "../../hooks/usePokemon";
import PokemonItem from "../../components/pokemon/PokemonItem";

export default function Detail() {
  const { pokemonName } = useParams();

  const { pokemon } = usePokemon(pokemonName);

  return (
    <section className="bg-orange-400 min-h-screen">
      {pokemon ? (
        <PokemonItem pokemon={pokemon} />
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </section>
  );
}
