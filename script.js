// ----------------- DOM Elements -----------------
const taskInput = document.getElementById("new-task"); // matches HTML
const addTaskBtn = document.querySelector("#todo-form button"); // first button inside form
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
    li.textContent = todo.task;
    li.className = "task-item";

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
  e.preventDefault(); // prevent form submission
  const newTask = taskInput.value.trim();
  if (!newTask) return;

  try {
    await fetch(`${BACKEND_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: newTask }),
    });
    taskInput.value = "";
    fetchTasks(); // refresh list
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
    fetchTasks(); // refresh list
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

// ----------------- Event Listeners -----------------
addTaskBtn.addEventListener("click", addTask);

// Optional: press Enter to add task
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask(e);
});

// ----------------- Initial Load -----------------
fetchTasks();
