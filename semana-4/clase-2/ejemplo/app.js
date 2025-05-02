// como encontramos al form?
const form = document.querySelector("form");

// para poder obtener la informacion del form existe un evento especial
// submit

// como hacemos que un elemento escuche un evento
form.addEventListener("submit", function (event) {
  // prevenir el comportamiento por defecto
  event.preventDefault();
  console.log("-----THIS-----");
  console.log(this);

  // FormData: Es una clase que me permite poder obtener la informacion
  // del formulario buscando por el name

  // Es una instancia
  const formData = new FormData(this);
  console.log(formData.get("username"));
  console.log(formData.get("mail"));
  console.log(formData.get("password"));
  console.log(formData.get("phone-number"));
});
