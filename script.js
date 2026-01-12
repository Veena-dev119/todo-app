const form = document.querySelector("#todo-form");
const input = document.querySelector("#new-task");
const ul = document.querySelector("#tasks");

// Load all tasks from backend
async function loadTasks() {
  ul.innerHTML = "";
  const res = await fetch("http://localhost:5000/todos");
  const todos = await res.json();
  todos.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.task;

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = async () => {
      await fetch(`http://localhost:5000/todos/${task._id}`, { method: "DELETE" });
      loadTasks();
    };

    li.appendChild(delBtn);
    ul.appendChild(li);
  });
}

// Add new task
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const taskText = input.value.trim();
  if (!taskText) return;

  await fetch("http://localhost:5000/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: taskText })
  });

  input.value = "";
  loadTasks();
});

// Initial load
loadTasks();
