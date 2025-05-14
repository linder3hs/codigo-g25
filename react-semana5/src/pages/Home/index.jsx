import PokemonList from "../../components/pokemon/PokemonList";

export default function Home() {
  return (
    <main>
      <section className="text-center">
        <h1 className="text-red-500 xl:text-green-500 text-3xl my-5">
          PokeApi
        </h1>
      </section>
      <PokemonList />
    </main>
  );
}
