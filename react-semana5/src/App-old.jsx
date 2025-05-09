import { useState, useEffect } from "react";
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

  const aumentar = () => {
    setContador(contador + 1);
  };

  const disminuir = () => {
    setContador(contador - 1);
  };

  // useEffect(function () {});

  useEffect(() => {
    console.log("Cuando el componente aparece");
    // dependencias son states que son manejados por useState
    // si tenemos una dependecia en nuestro useEffect y el state de esta cambia el useEffect se volver a ejecutar
  }, []);

  useEffect(() => {
    console.log("Contador", contador);
    // setContador(contador + 1); // si dentro del useEffect cambio a contador, entonces contador hara que ese
    // useEffect se vuelva a ejecutar
  }, [contador]);

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
