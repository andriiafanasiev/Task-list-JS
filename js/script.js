const addTaskBtn = document.querySelector(".todo-list__button--add");
const taskInput = document.querySelector("#taskInput");

function addTask(taskText) {
  const li = document.createElement("li");
  li.className = "todo-list__item";

  const buttons = document.createElement("div");
  buttons.className = "todo-list__item-buttons";

  const liTitle = document.createElement("h5");
  liTitle.className = "todo-list__title";
  liTitle.textContent = taskText;

  li.appendChild(liTitle);

  const deleteButton = document.createElement("button");
  deleteButton.className = "todo-list__button todo-list__item-button--delete";
  deleteButton.textContent = "Delete";

  const completeButton = document.createElement("button");
  completeButton.className =
    "todo-list__button todo-list__item-button--complete";
  completeButton.textContent = "Complete";

  buttons.appendChild(completeButton);
  buttons.appendChild(deleteButton);
  li.appendChild(buttons);

  document.getElementById("taskList").appendChild(li);

  addEventListenersToTask(li);
}
addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (typeof taskText === "string" && taskText != "") {
    addTask(taskText);
  }
  taskInput.value = "";
});

const loadBtn = document.querySelector(".main-buttons__button__load-btn");
const saveBtn = document.querySelector(".main-buttons__button__save-btn");

saveBtn.addEventListener("click", () => {
  const itemsHtml = Array.from(
    document.querySelectorAll(".todo-list__items li")
  ).map((li) => li.outerHTML);

  const itemsJson = JSON.stringify(itemsHtml);

  localStorage.setItem("tasks", itemsJson);
});
loadBtn.addEventListener("click", () => {
  const taskList = document.getElementById("taskList");
  const tasks = localStorage.getItem("tasks");
  if (tasks) {
    taskList.innerHTML = "";
    const taskHtml = JSON.parse(tasks);
    taskHtml.forEach((taskHtml) => {
      taskList.insertAdjacentHTML("beforeend", taskHtml);
    });
    // Re-attach event listeners to all tasks
    const loadedTasks = document.querySelectorAll(".todo-list__items li");
    loadedTasks.forEach(addEventListenersToTask);
  } else {
    alert("No saved items");
  }
});

function addEventListenersToTask(task) {
  const deleteButton = task.querySelector(".todo-list__item-button--delete");
  const completeButton = task.querySelector(
    ".todo-list__item-button--complete"
  );
  const liTitle = task.querySelector(".todo-list__title");

  deleteButton.addEventListener("click", () => {
    task.remove();
  });

  completeButton.addEventListener("click", () => {
    liTitle.classList.toggle("todo-list__item--completed");
  });
}
