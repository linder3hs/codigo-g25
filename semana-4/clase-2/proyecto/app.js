const newTaskForm = document.querySelector("#form-create");
const updateTaskForm = document.querySelector("#form-update");
const inputUpdateTask = document.querySelector("#input-update-task");
const taskId = document.querySelector("#task-id");
const editModal = document.querySelector("#editModal");

const taskCount = document.getElementById("task-count");
const taskList = document.querySelector("#tasks-list");

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

newTaskForm.addEventListener("submit", function (event) {
  // evitar el comportamiento por defecto
  event.preventDefault();

  const formData = new FormData(this);
  const task = formData.get("task");
  const newTask = {
    id: tasks.length + 1,
    task,
    created_at: new Date(),
    status: 1,
  };

  tasks.push(newTask);
  createElementTask(newTask);
  // cuando se termine de crear la tarea
  // 1. Limpio el form
  this.reset();
  // 2. Mostramos una notificacion
  notyf.success("Tarea creada correctamente");

  countCreatedTask();
});

updateTaskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  const id = Number(formData.get("task-id"));
  const newTask = formData.get("task");

  // vamos a volver a buscar por id
  const searchedTask = tasks.find(function (task) {
    return task.id === id;
  });
  // Estamos cambiando el texto anterior por el nuevo
  searchedTask.task = newTask;
  // vamos a agregar una nueva propiedad updated_at
  searchedTask.updated_at = new Date();

  const modal = bootstrap.Modal.getInstance(editModal);
  modal.hide();
  renderTasks();
  notyf.success("Tarea actualizada correctamente");
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

function handleEdit(id) {
  // busqueda por id -> la busqueda sera en el arreglo tasks
  const searchedTask = tasks.find(function (task) {
    return task.id === id;
  });
  inputUpdateTask.value = searchedTask.task;
  taskId.value = searchedTask.id;
  inputUpdateTask.focus();
}

function renderTasks() {
  taskList.innerHTML = "";
  for (let task of tasks) {
    createElementTask(task);
  }
}

function handleCheckTask(element, id) {
  console.log(element.checked, id);
  if (element.checked) {
    const searchedTask = tasks.find(function (task) {
      return task.id === id;
    });

    searchedTask.status = 2;
    searchedTask.updated_at = new Date();
  }
}

function createElementTask(newTask) {
  const html = `<div
              class="list-group-item list-group-item-action p-0 mb-3 border rounded-3 shadow-sm"
            >
              <div class="d-flex p-3">
                <div class="form-check me-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    onchange="handleCheckTask(this, ${newTask.id})"
                    id="task1"
                  />
                </div>
                <div class="flex-grow-1">
                  <h5 class="mb-1 fw-semibold">${newTask.task}</h5>
                  <small class="text-muted">
                    <i class="bi bi-calendar3 me-1"></i> ${newTask.created_at}
                  </small>
                </div>
              </div>
              <div
                class="card-footer bg-light p-2 d-flex justify-content-end border-top"
              >
                <button
                  type="button"
                  class="btn btn-outline-primary btn-sm me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  onclick="handleEdit(${newTask.id})"
                >
                  <i class="bi bi-pencil"></i> Editar
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm">
                  <i class="bi bi-trash"></i> Eliminar
                </button>
              </div>
            </div> `;
  // innerHTML: Es el que permite agregar un texto como html
  taskList.innerHTML += html;
}

countCreatedTask();
