const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define("User", {
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

User.sync();

User.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

module.exports = User;
