import { useState } from "react";
// Para manajer variables dentro de nuestro componente es necesario usar el hook useState
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const items = [
    "Inicio",
    "Proyectos",
    "Contacto",
    "Info",
    "Equipo",
    "Testimonios",
  ];

  const [contador, setContador] = useState(100);
  // arrow funcion
  // function aumentar() {
  //   // aumente el valor de 1 en 1
  //   setContador(contador + 1);
  // }
  const aumentar = () => {
    setContador(contador + 1);
  };

  const disminuir = () => {
    setContador(contador - 1);
  };

  return (
    <main>
      {/* usamos atributos para que el padre le envie un valor al hijo */}
      <Header
        fullname={"Linder Hassinger"}
        address={"av mi casa 123"}
        phone={99999}
        items={items}
      />
      <section>
        <h1>Mi primera web con React {contador} </h1>
        {/* solo se llama de esta manera si la funcion no requiere parametros */}
        <button onClick={aumentar}>Aumentar {contador} </button>
        <button onClick={disminuir}>Disminuir {contador} </button>
      </section>
      <Footer />
    </main>
  );
}

export default App;
