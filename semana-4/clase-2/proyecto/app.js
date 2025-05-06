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
  success("Tarea creada correctamente");

  countCreatedTask();
});

btnDeleteModal.addEventListener("click", function () {
  // aca vamos a poder obtener el id
  const id = Number(this.dataset.id);

  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });

  renderTasks();

  const modal = bootstrap.Modal.getInstance(deleteModal);
  modal.hide();

  success("Se elimino la tarea correctamente!");
});

updateTaskForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(this);
  const id = Number(formData.get("task-id"));
  const newTask = formData.get("task");

  // vamos a volver a buscar por id
  const searchedTask = searchOneTaskById(id);
  // Estamos cambiando el texto anterior por el nuevo
  searchedTask.task = newTask;
  // vamos a agregar una nueva propiedad updated_at
  searchedTask.updated_at = new Date();

  const modal = bootstrap.Modal.getInstance(editModal);
  modal.hide();
  renderTasks();
  success("Tarea actualizada correctamente");
});

countCreatedTask();
