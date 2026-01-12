// ----------------- DOM Elements -----------------
const taskInput = document.getElementById("new-task");
const taskForm = document.getElementById("todo-form");
const taskList = document.getElementById("tasks");

// ----------------- Backend URL -----------------
const BACKEND_URL = "https://todo-app-backend-eqqj.onrender.com";

// ----------------- Functions -----------------

// Fetch all tasks from backend
async function fetchTasks() {
  try {
    const res = await fetch(`${BACKEND_URL}/todos`);
    const todos = await res.json();
    renderTasks(todos);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

// Render tasks in the UI
function renderTasks(todos) {
  taskList.innerHTML = ""; // clear previous list
  todos.forEach(todo => {
    const li = document.createElement("li");
    li.className = "task-item";

    const span = document.createElement("span");
    span.textContent = todo.task;
    li.appendChild(span);

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => deleteTask(todo._id);

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

// Add a new task
async function addTask(e) {
  e.preventDefault(); // prevent page refresh
  const newTask = taskInput.value.trim();
  if (!newTask) return;

  try {
    await fetch(`${BACKEND_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: newTask }),
    });
    taskInput.value = "";
    fetchTasks();
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

// Delete a task
async function deleteTask(id) {
  try {
    await fetch(`${BACKEND_URL}/todos/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

// ----------------- Event Listeners -----------------
taskForm.addEventListener("submit", addTask);

// ----------------- Initial Load -----------------
fetchTasks();
