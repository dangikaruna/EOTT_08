
const { DataTypes } = require("sequelize");
const sequelize = require("../../db/connect");

const user = sequelize.define(
  "user",
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique : true
    },

    userName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: "test@eott.com",
      allowNull: false,
    },
    roleTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDelete: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },

    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,

    },

    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,

    },

  },
  {
    timestamps: false,
    tableName: "user",
  }
);
//Export user model
module.exports = user;

