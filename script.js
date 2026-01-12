const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Render backend URL
const BASE_URL = "https://todo-app-backend-eqqj.onrender.com";

// Fetch and display tasks
async function fetchTodos() {
  try {
    const res = await fetch(`${BASE_URL}/todos`);
    const todos = await res.json();
    todoList.innerHTML = ""; // Clear existing list

    todos.forEach(todo => {
      const li = document.createElement("li");
      li.textContent = todo.task;

      // Create Delete button
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.addEventListener("click", () => deleteTodo(todo._id));

      li.appendChild(delBtn);
      todoList.appendChild(li);
    });
  } catch (err) {
    console.error("Failed to fetch todos:", err);
  }
}

// Add a new task
async function addTodo() {
  const task = todoInput.value.trim();
  if (!task) return;

  try {
    const res = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task })
    });

    const data = await res.json();
    todoInput.value = ""; // Clear input
    fetchTodos(); // Refresh list
  } catch (err) {
    console.error("Failed to add todo:", err);
  }
}

// Delete a task
async function deleteTodo(id) {
  try {
    await fetch(`${BASE_URL}/todos/${id}`, { method: "DELETE" });
    fetchTodos(); // Refresh list
  } catch (err) {
    console.error("Failed to delete todo:", err);
  }
}

// Event listener
addBtn.addEventListener("click", addTodo);

// Initial load
fetchTodos();
