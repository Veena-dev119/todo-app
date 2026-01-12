// Render backend URL
const BASE_URL = "https://todo-app-backend-eqqj.onrender.com/todos";

// DOM Elements
const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Fetch and display all tasks from backend
async function fetchTodos() {
  try {
    const res = await fetch(BASE_URL);
    const todos = await res.json();

    // Clear current list
    todoList.innerHTML = "";

    // Render each todo
    todos.forEach(todo => {
      const li = document.createElement("li");
      li.textContent = todo.task;

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.onclick = () => deleteTodo(todo._id);

      li.appendChild(delBtn);
      todoList.appendChild(li);
    });
  } catch (error) {
    console.error("Failed to fetch todos:", error);
  }
}

// Add a new todo
async function addTodo() {
  const task = taskInput.value.trim();
  if (!task) return;

  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task })
    });

    const newTodo = await res.json();
    taskInput.value = ""; // Clear input
    fetchTodos(); // Refresh list
  } catch (error) {
    console.error("Failed to add todo:", error);
  }
}

// Delete a todo
async function deleteTodo(id) {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE"
    });

    fetchTodos(); // Refresh list
  } catch (error) {
    console.error("Failed to delete todo:", error);
  }
}

// Event listeners
addBtn.addEventListener("click", addTodo);

// Load todos on page load
fetchTodos();
