const { DataTypes } = require("sequelize");
const sequelize = require("../../db/connect");
const CourseType = require("./coursesType");
const CourseCategory = require("./courseCategory");

const SubCourse = sequelize.define(
  "SubCourse",
  {
    subCourseId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    subCourseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CourseType,
        key: "courseId",
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CourseCategory,
        key: "categoryId",
      },
    },
    coursePathDetails: {
      type: DataTypes.JSON,
    },
    contentType: {
      // type: DataTypes.ARRAY(DataTypes.ENUM("mp4", "audio", "pdf", "word")),
      // defaultValue: ["mp4", "audio", "pdf", "word"],
      // allowNull: true,
      type: DataTypes.JSON,
      defaultValue: ["mp4", "audio", "pdf", "word"],
      allowNull: true,
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
    tableName: "SubCourse",
  }
);

SubCourse.belongsTo(CourseType, { foreignKey: "courseId" });
CourseType.hasMany(SubCourse, { foreignKey: "courseId" });

SubCourse.belongsTo(CourseCategory, { foreignKey: "categoryId" });
CourseCategory.hasMany(SubCourse, { foreignKey: "categoryId" });

module.exports = SubCourse;
