const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

exports.sequelize = new Sequelize(
  "book_store",
  process.env.MYSQL_NAME,
  process.env.MYSQL_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);
