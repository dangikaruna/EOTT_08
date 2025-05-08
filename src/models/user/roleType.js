
//Import necessary modules
const { DataTypes } = require("sequelize");
const sequelize = require("../../db/connect");

const roleTypes = sequelize.define(
  "roleTypes",
  {
    roleTypeId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    roleTypeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    tableName: "roleTypes",
  }
);

//Export accessLevl model
module.exports = roleTypes;
