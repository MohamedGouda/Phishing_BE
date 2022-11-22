const { Sequelize, DataTypes } = require("sequelize");
const db = require("../Database/connection");

const Users = db.define(
  "user",
  {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.TEXT,
    email: DataTypes.TEXT,
    domain: DataTypes.ARRAY([DataTypes.STRING]),
    password: DataTypes.TEXT,
    subscription_date: DataTypes.DATE,
    subscription_expiry_date: DataTypes.DATE,
  },
  { timestamps: false }
);

module.exports = Users;
