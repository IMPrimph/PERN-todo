const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes

//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) returning *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// get a todo by id
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 returning *",
      [description, id]
    );
    res.json(updateTodo.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(deleteTodo.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(4000, () => {
  console.log("Server started running");
});
