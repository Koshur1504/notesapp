const express = require("express");
const { userRouter } = require("./router/user.router");
const { connection } = require("./config/connectdb");
const { noteRouter } = require("./router/notes.routes");

const app = express();
app.use(express.json());
const port = 7700;

app.use("/user", userRouter);
app.use("/notes", noteRouter);

app.listen(port, async () => {
  try {
    await connection;
    console.log("db connected");
    console.log(`Server Started on port ${port}`);
  } catch (error) {
    console.log(error);
  }
});
