const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
//? this particular app uses pool to connect to the database instead of knex

//* middleware
app.use(cors());
app.use(express.json());

//* Routes

//* Create todo
//? RETURNING * (line 19 & line 22 are connected,
//? if you want to send the new value as json)
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log("create route", err.message);
  }
});

//* get all todos
//? SELECT * (line 33) returns the entire object,
//? if you need just one key/value pair, you can specify it instead of *
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.log("get all route", err.message);
  }
});

//* get a todo

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (err) {
    console.log("get one route", err.message);
  }
});

//* update a todo

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",
      [description, id]
    );

    res.json(updateTodo.rows[0]);
  } catch (err) {
    console.log("update route", err.message);
  }
});

//* delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1 RETURNING *",
      [id]
    );

    res.json(deleteTodo.rows[0]);
  } catch (err) {
    console.log("delete route", err.message);
  }
});

//* listener
app.listen(5000, () => {
  console.log("listening on port 5000");
});
