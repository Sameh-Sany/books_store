const express = require("express");
const app = express();
const db = require("./src/config/db");

// db connection
db.connect();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
