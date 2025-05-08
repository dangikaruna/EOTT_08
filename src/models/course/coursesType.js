const { DataTypes } = require("sequelize");
const sequelize = require("../../db/connect");
const CourseCategory = require("./courseCategory");

const CourseType = sequelize.define(
  "CourseType",
  {
    courseId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CourseCategory,
        key: "categoryId",
      },
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseUniquePrefix: {
      type: DataTypes.STRING,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "CourseType",
  }
);

CourseType.belongsTo(CourseCategory, { foreignKey: "categoryId" });
CourseCategory.hasMany(CourseType, { foreignKey: "categoryId" });

module.exports = CourseType;
