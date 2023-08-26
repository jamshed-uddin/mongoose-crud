const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const todoHandler = require("./routeHandler/todoHandler");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => console.log(error));

app.use("/todo", todoHandler);

app.get("/", (req, res) => {
  res.send("mongoose crud is running");
});

// error handler

app.listen(process.env.PORT, () => {
  console.log(`mongoose_crud running on port ${process.env.PORT}`);
});
