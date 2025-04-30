// Buscamos elementos por getElementById
const main = document.querySelector("main");
const title = document.getElementById("titulo");
const content = document.querySelector("#contenido");
const content2 = document.querySelector(".parrafo");

const btnMenu = document.querySelector("#menu");
const menuContainer = document.querySelector(".menu-container");

btnMenu.addEventListener("click", function () {
  if (menuContainer.classList.contains("hidden")) {
    menuContainer.classList.remove("hidden");
  } else {
    menuContainer.classList.add("hidden");
  }
});

console.log(title);
console.log(content);

title.textContent = "Codigo power by TECSUP";
content.style.color = "green";
content2.textContent = "Bootcamp Full Stack - Desarrollo Web";

function createLink() {
  // creando elementos con JS
  const linkTecsup = document.createElement("a");
  linkTecsup.textContent = "Web - Tecsup";
  linkTecsup.style.display = "block";
  linkTecsup.href = "https://codigo.edu.pe/";

  // creen otro enlace al youtube de codigo tecsup

  // Este elemento esta creado en JS, por defecto no es visible
  // porque NO esta en el HTML
  // Debemo insertar este elemento dentro de nuestro html
  main.appendChild(linkTecsup);
}

createLink();

// const comentario = prompt("Ingresa un comentario");
// console.log(comentario);
/**
 * Cuando hagamos click en el boton agregar comentario, se abre
 * el prompt y el usuario escriba un comentario y que ese se agregue
 * en el footer
 */
