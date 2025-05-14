import arrowBack from "../../../assets/arrow_back.svg";

export default function PokemonHeader(props) {
  const { pokemon } = props;

  return (
    <div className="text-white flex items-center justify-between p-5">
      <div className="flex gap-5">
        <img width={32} src={arrowBack} alt="" />
        <h1 className="font-bold capitalize text-2xl">{pokemon.name}</h1>
      </div>
      <div>
        <p className="font-semibold"># {String(pokemon.id).padStart(3, 0)}</p>
      </div>
    </div>
  );
}
