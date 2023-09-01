const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

exports.sequelize = new Sequelize(
  "book_store",
  process.env.POSTGRES_NAME,
  process.env.POSTGRES_PASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    logging: false,
  }
);
