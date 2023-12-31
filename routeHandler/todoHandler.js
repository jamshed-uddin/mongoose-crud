const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const todoSchema = require("../schema/todoSchema");

const Todo = new mongoose.model("Todo", todoSchema);
//get all todo
//in mongoose we don't need to use .toArray with .find method.mongoose already returns an array of abjects. .select() with .find() if we want not to send specific field like .find().select({_id:0})  .it takes an object. .limit(number) to limit the number of document we want to send as response.
router.get("/", async (req, res) => {
  await Todo.find()
    .select({ _id: 0, __v: 0 })
    .limit()
    .then((result) => res.status(201).json(result))
    .catch((error) => res.status(401).json({ error: "Something went wrong" }));
});

//get a todo by id
router.get("/:id", async (req, res) => {
  await Todo.findOne({ _id: req.params.id })
    .then((result) => res.send(result))
    .catch((error) => res.status(401).json({ error: "Something went wrong" }));
});

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

//  update todo /
// findByIdAndUpdate returns updated document if we provide {new: true} option. if we use updateOne it doesn't returns complete updated document it returns only update statuses like modifiedCount: 1, if we want to get updated document we have to find that document separately by findOne method.
router.put("/:id", async (req, res) => {
  await Todo.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { status: req.body.status } },
    { new: true }
  )
    .then((result) => {
      res.status(200).json({ message: "Todo updated successfully", result });
    })
    .catch((error) => res.status(401).json({ error: error.message }));
});

//  delete todo
router.delete("/:id", async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.deletedCount) {
        res.json({ message: "Todo deleted successfully" });
      }
    })
    .catch((error) => res.status(401).json({ error: error.message }));
});

module.exports = router;
