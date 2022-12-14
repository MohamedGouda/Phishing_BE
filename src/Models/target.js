const { Sequelize, DataTypes } = require("sequelize");
const db = require("../Database/connection");

const Target = db.define(
  "target",
  {
    target_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    rate: DataTypes.FLOAT,
    user_id: DataTypes.UUID,
  },
  { timestamps: false }
);

module.exports = Target;
