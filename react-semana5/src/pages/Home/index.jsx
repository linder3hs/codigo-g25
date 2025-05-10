import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
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
      setPokemons(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPokemons();
  }, []);

  return (
    <main>
      <section className="text-center">
        <h1 className="text-red-500 xl:text-green-500 text-3xl my-5">
          PokeApi
        </h1>
      </section>
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
    </main>
  );
}
