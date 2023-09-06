const express = require("express");
const app = express();
const morgan = require("morgan");

// require routes
const uploadRoutes = require("./src/routes/upload");
const authRoutes = require("./src/routes/auth");
const bookRoutes = require("./src/routes/books");

// middlewares
app.use(morgan("dev"));
app.use(express.json());

// db connection

// use routes
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
