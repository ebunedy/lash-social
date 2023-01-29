const express = require("express");
require("dotenv").config();
require("express-async-errors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connectDb = require("./db/db");

require('./auth/auth')
//router routes
const userRouter = require("./routes/user.routes");
const postRouter = require("./routes/post.routes");

app.use("/users", userRouter);
app.use('/posts', postRouter);

// Handle errors.. will be swapped out later
app.use((err, req, res, next) => {
  //const isProduction = process.env.NODE_ENV === 'production';
  console.log(err);
  res.status(err.status || 500);
  res.json({ error: err.message });
});

const PORT = process.env.PORT || 3000;

connectDb();

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
