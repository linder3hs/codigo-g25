import straighten from "@/assets/straighten.svg";
import weight from "@/assets/weight.svg";
import PokemonHeader from "./PokemonHeader";
import { Card } from "@/components/ui/card";

export default function PokemonItem(props) {
  const { pokemon } = props;

  return (
    <div className="max-w-lg mx-auto">
      <PokemonHeader pokemon={pokemon} />
      <Card className="mx-2 p-5 rounded-xl relative mt-40">
        <div className="flex justify-center max-h-[200px] right-0 left-0 mt-8 absolute -top-48 w-full">
          <img
            src={pokemon.sprites.other.dream_world.front_default}
            alt={pokemon.name}
            width={200}
            height={200}
          />
        </div>
        <div className="mt-10">
          <div className="flex justify-center gap-5">
            {pokemon.types.map((item, index) => (
              <p
                key={index}
                className="bg-orange-400 py-1 px-2 text-white font-semibold capitalize rounded-xl"
              >
                {item.type.name}
              </p>
            ))}
          </div>
          <section className="mt-8">
            <h4 className="text-center text-orange-400 font-bold">About</h4>
            <section className="mt-4 flex justify-between text-sm font-light text-center">
              <div className="flex-1">
                <p className="flex justify-center gap-2 items-center">
                  <img width={16} src={weight} alt="" />
                  <span>{pokemon.weight} kg</span>
                </p>
                <p className="mt-4">Weight</p>
              </div>
              <div className="border-x flex-1 border-gray-300">
                <p className="flex justify-center gap-2 items-center">
                  <img width={16} src={straighten} alt="" />
                  <span>{pokemon.height / 10} m</span>
                </p>
                <p className="mt-4">Height</p>
              </div>
              <div className="flex-1">
                <div>
                  {pokemon.moves.splice(0, 2).map((item) => (
                    <p className="text-xs capitalize" key={item.move.name}>
                      {item.move.name}
                    </p>
                  ))}
                </div>
                <p className="mt-1">Moves</p>
              </div>
            </section>
          </section>
        </div>
      </Card>
    </div>
  );
}
