const { Sequelize } = require("sequelize");
const config = require("../Config")[process.env.NODE_ENV || "development"];

module.exports =  new Sequelize(config.postgres.options);
