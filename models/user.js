const Sequelize = require("sequelize");
const Band = require("./band")
const sequelize = require("../utils/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  email: {
    type: Sequelize.STRING
 
  },

  username: {
    type: Sequelize.STRING
 
  },

  password: {
    type: Sequelize.STRING
  }
});

User.hasMany(Band);

module.exports = User;
