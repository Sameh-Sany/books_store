const express = require("express");
const app = express();
const db = require("./src/config/db");
const morgan = require("morgan");

// middlewares
app.use(morgan("dev"));

// require routes
const authRoutes = require("./src/routes/auth");

// db connection
db.sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Error: " + err));

// use routes
app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
