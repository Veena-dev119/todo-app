# 🌟 My todo-app

A simple full-stack Todo application built with HTML, CSS, JavaScript, Node.js, Express, and MongoDB.  
Keep track of your tasks, add new ones, and delete completed tasks—all with a clean and user-friendly interface.

---

Live Demo:

https://veena-dev119.github.io/todo-app/

---

Features:

- Add new tasks
- View all tasks in a dynamic list
- Delete tasks
- Persistent storage using MongoDB
- Fully responsive and simple UI

---

Tech Stack:

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MongoDB
- Other: CORS, Body-parser, dotenv

---

Project Structure:

Frontend:
- index.html
- style.css
- script.js

Backend:
- server.js
- package.json
- .env (contains MONGODB_URI)
- node_modules/ (ignored in .gitignore)

---

Installation & Setup:

Backend Setup:

- Open the backend folder in terminal
- Install dependencies:
  npm install

- Create a `.env` file in the backend folder and add:
  MONGODB_URI=your_mongodb_connection_string

- Start the backend server:
  npm start

- The server will run at:
  http://localhost:5000

Frontend Setup:

- Open `index.html` in your browser
- The frontend connects to the backend API using the URL defined in `script.js`

---

API Endpoints:

GET    /todos        - Fetch all tasks (No body required)
POST   /todos        - Add a new task (Body: { "task": "Task text" })
DELETE /todos/:id    - Delete a task (No body required)

---

Usage:

1. Open the live demo link or frontend in your browser.
2. Add a new task using the input field and "Add" button.
3. Delete a task by clicking the red "Delete" button.
4. All tasks are stored in MongoDB and persist between sessions.

---

Notes:

- Make sure MongoDB is running and `.env` has the correct URI.
- `node_modules` and `.env` are ignored in `.gitignore` for security and size reasons.
- The frontend connects to the backend using the `BACKEND_URL` variable in `script.js`.

---

Author:

Veena  
vpuppala18@gmail.com
