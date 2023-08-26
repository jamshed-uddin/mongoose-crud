const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const todoSchema = require("../schema/todoSchema");

const Todo = new mongoose.model("Todo", todoSchema);
//get all todo
router.get("/", async (req, res) => {});

//get a todo by id
router.get("/:id", async (req, res) => {});

//post a todo
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo
    .save()
    .then(() => {
      res.status(200).json({ message: "Todo inserted successfully" });
    })
    .catch((error) => res.status(401).json({ error: "Something went wrong" }));
});

//post multiple todo
router.post("/multiple", async (req, res) => {
  await Todo.insertMany(req.body)
    .then(() => {
      res.status(200).json({ message: "Multiple todos inserted successfully" });
    })
    .catch((error) => res.status(401).json({ error: "Something went wrong" }));
});

//  update todo
router.put("/:id", async (req, res) => {});

//  delete todo
router.delete("/:id", async (req, res) => {});

module.exports = router;
