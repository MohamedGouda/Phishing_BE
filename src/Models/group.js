const { Sequelize, DataTypes } = require("sequelize");
const db = require("../Database/connection");

const Group = db.define(
  "group",
  {
    group_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.TEXT,
    rate: DataTypes.FLOAT,
    user_id: DataTypes.UUID,
  },
  { timestamps: false }
);

module.exports = Group;
