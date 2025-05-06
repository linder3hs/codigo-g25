/**
 * Este archvio, esta dedicado para almancenar variables globales
 */
// forms
const newTaskForm = document.querySelector("#form-create");
const updateTaskForm = document.querySelector("#form-update");

// edit form inputs
const inputUpdateTask = document.querySelector("#input-update-task");
const taskId = document.querySelector("#task-id");

// modals
const editModal = document.querySelector("#editModal");

// modal button
const deleteModal = document.querySelector("#deleteModal");
const btnDeleteModal = document.querySelector("#btn-delete-modal");

// count
const taskCount = document.getElementById("task-count");

// container tasks
const taskList = document.querySelector("#tasks-list");

// array de tareas global
let tasks = [];
