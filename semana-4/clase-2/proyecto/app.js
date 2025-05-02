const form = document.querySelector("form");
const taskCount = document.getElementById("task-count");

const notyf = new Notyf({
  position: {
    x: "right",
    y: "top",
  },
});
/**
 * Este arreglo va a contener la lista de las tareas que creemos
 *
 * Los estados: se puede representar como numeros, siempre y cuando tengamos
 * la documentación
 *
 * 1 = CREADO
 * 2 = TERMINADO
 * 3 = ELIMINADO
  {
    task: "Comprar cables",
    created_at: new Date(),
    status: 1
  }
 */
const tasks = [];

form.addEventListener("submit", function (event) {
  // evitar el comportamiento por defecto
  event.preventDefault();

  const formData = new FormData(this);
  const task = formData.get("task");

  tasks.push({
    task,
    created_at: new Date(),
    status: 1,
  });
  // cuando se termine de crear la tarea
  // 1. Limpio el form
  this.reset();
  // 2. Mostramos una notificacion
  notyf.success("Tarea creada correctamente");

  countCreatedTask();
});

/**
 * Por ahora vamos a llamar a esta funcion 2 veces
 * 1. Crear una tarea
 * 2. Cuand iniciamos la web
 */
function countCreatedTask() {
  const createdFilter = tasks.filter(function (task) {
    return task.status === 1;
  });

  taskCount.textContent = createdFilter.length;
}

countCreatedTask();
