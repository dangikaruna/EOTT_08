const { DataTypes } = require("sequelize");
const sequelize = require("../../db/connect");
const SubCourse = require("./subCourses");

const CourseContent = sequelize.define(
  "CourseContent",
  {
    contentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subCourseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SubCourse,
        key: "subCourseId",
      },
    },
    courseDescription: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    contentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contentPrefix: {
      type: DataTypes.STRING,
      unique: false,
    },
    contentPath: {
      type: DataTypes.JSON,
    },
    contentType: {
      type: DataTypes.STRING,
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
    tableName: "CourseContent",
  }
);

CourseContent.belongsTo(SubCourse, { foreignKey: "subCourseId" });
SubCourse.hasMany(CourseContent, { foreignKey: "subCourseId" });

module.exports = CourseContent;
