// Load environment variables
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection (FROM .env)
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("❌ MONGODB_URI not found in .env file");
  process.exit(1);
}

const client = new MongoClient(uri);
let collection;

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    const db = client.db("todoApp");
    collection = db.collection("tasks");
    console.log("Connected to MongoDB ✅");
  } catch (error) {
    console.error("MongoDB connection error ❌", error);
  }
}

connectDB();

// ---------------- ROUTES ----------------

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await collection.find({}).toArray();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// Add a todo
app.post("/todos", async (req, res) => {
  try {
    const { task } = req.body;
    if (!task) {
      return res.status(400).json({ error: "Task is required" });
    }

    const result = await collection.insertOne({ task });
    res.json({ _id: result.insertedId, task });
  } catch (error) {
    res.status(500).json({ error: "Failed to add todo" });
  }
});

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await collection.deleteOne({ _id: new ObjectId(id) });
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
