const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const uri =
"mongodb+srv://Vanaja:simple12345@cluster0.oxh3zqq.mongodb.net/todoApp?retryWrites=true&w=majority";

// const uri = "mongodb+srv://admin:db_Vanaja%40123456789@cluster0.oxh3zqq.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

let collection;

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    const db = client.db("todoApp");
    collection = db.collection("tasks");
    console.log("Connected to MongoDB ✅");
  } catch (err) {
    console.error(err);
  }
}
connectDB();

// Routes

// Get all tasks
app.get("/todos", async (req, res) => {
  const todos = await collection.find({}).toArray();
  res.json(todos);
});

// Add a task
app.post("/todos", async (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: "Task is required" });

  const result = await collection.insertOne({ task });
  res.json({ id: result.insertedId, task });
});

// Delete a task
app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;
  await collection.deleteOne({ _id: ObjectId(id) });
  res.json({ message: "Task deleted" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
