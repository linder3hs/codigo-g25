/**
 * Muestra la cantidad de taras con estado 1
 */
function countCreatedTask() {
  const createdFilter = tasks.filter(function (task) {
    return task.status === 1;
  });

  taskCount.textContent = createdFilter.length;
}

function createElementTask(newTask) {
  const html = `<div
              class="list-group-item list-group-item-action p-0 mb-3 border rounded-3 shadow-sm"
            >
              <div class="d-flex p-3">
                <div class="${
                  newTask.status === 2 ? "d-none " : ""
                }form-check me-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    onchange="handleCheckTask(this, ${newTask.id})"
                    id="task1"
                  />
                </div>
                <div class="flex-grow-1">
                  <h5 class="mb-1 fw-semibold ${
                    newTask.status === 2 ? "text-decoration-line-through" : ""
                  }">${newTask.task}</h5>
                  <small class="text-muted">
                    <i class="bi bi-calendar3 me-1"></i> ${newTask.created_at}
                  </small>
                </div>
              </div>
              <div
                class="card-footer bg-light p-2 d-flex justify-content-end border-top ${
                  newTask.status === 2 ? "d-none" : ""
                }"
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
                <button
                  type="button"
                  onclick="handleDelete(${newTask.id})"
                  class="btn btn-outline-danger btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                >
                  <i class="bi bi-trash"></i> Eliminar
                </button>
              </div>
            </div> `;
  // innerHTML: Es el que permite agregar un texto como html
  taskList.innerHTML += html;
}

function renderTasks() {
  taskList.innerHTML = "";
  for (let task of tasks) {
    createElementTask(task);
  }
}

/**
 * @param {*} id number
 * Setean el input value y el input hidden
 */
function handleEdit(id) {
  // busqueda por id -> la busqueda sera en el arreglo tasks
  const searchedTask = tasks.find(function (task) {
    return task.id === id;
  });
  inputUpdateTask.value = searchedTask.task;
  taskId.value = searchedTask.id;
  inputUpdateTask.focus();
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

  renderTasks();
}

function handleDelete(id) {
  console.log(id);
  btnDeleteModal.dataset.id = id; // data-id
}
