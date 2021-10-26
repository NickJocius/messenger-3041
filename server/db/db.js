const Sequelize = require("sequelize");
require('dotenv').config();
const db = new Sequelize(process.env.DATABASE_URL || process.env.DB_PW , {
  logging: false
});

module.exports = db;
