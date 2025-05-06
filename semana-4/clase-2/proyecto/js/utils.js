function searchOneTaskById(id) {
  return tasks.find(function (task) {
    return task.id === id;
  });
}
