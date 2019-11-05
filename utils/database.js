const Sequelize = require("sequelize");

const sequelize = new Sequelize("band-list", "root", "", {
    dialect: 'sqlite',
    storage: './db.sqlite3'
});


module.exports = sequelize;