import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import arrowBack from "../../assets/arrow_back.svg";

export default function Detail() {
  const { pokemonName } = useParams();

  const [pokemon, setPokemon] = useState(null);

  const fetchPokemonData = async () => {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Error en el servidor");
      }

      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  return (
    <section className="bg-orange-400 min-h-screen">
      {pokemon ? (
        <>
          <div className="text-white flex items-center justify-between p-5">
            <div className="flex gap-5">
              <img width={32} src={arrowBack} alt="" />
              <h1 className="font-bold capitalize text-2xl">{pokemon.name}</h1>
            </div>
            <div>
              <p className="font-semibold"># {pokemon.id}</p>
            </div>
          </div>
          <div className="mx-2 bg-white p-5 rounded-xl relative mt-40">
            <div className="flex justify-center max-h-[200px] mt-8 absolute -top-48 w-full">
              <img
                src={pokemon.sprites.other.dream_world.front_default}
                alt={pokemon.name}
                width={200}
                height={200}
              />
            </div>
            <div className="mt-10">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius
                quidem eos enim architecto cupiditate in quo alias aspernatur
                cum! Obcaecati atque officia aliquam nemo delectus quis eaque
                consectetur. Corrupti, esse.
              </p>
            </div>
          </div>
        </>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </section>
  );
}
