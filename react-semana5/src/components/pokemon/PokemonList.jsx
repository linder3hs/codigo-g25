import usePokemon from "@/hooks/usePokemon";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../ui/card";

export default function PokemonList() {
  const { pokemons } = usePokemon();

  return (
    <section className="pokemons-container">
      {pokemons.map((pokemon, index) => (
        <Link to={`/pokemon/${pokemon.name}`} key={index}>
          <Card>
            <CardContent className="flex flex-col items-center gap-5">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
                  index + 1
                }.svg`}
                alt={pokemon.name}
                className="block h-[200px]"
                height={200}
              />
              <h3 className="text-center capitalize text-xl font-semibold">
                {pokemon.name}
              </h3>
            </CardContent>
          </Card>
        </Link>
      ))}
    </section>
  );
}
