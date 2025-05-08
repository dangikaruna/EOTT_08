// Import necessary modules
const { DataTypes, UniqueConstraintError } = require("sequelize");
const sequelize = require("../../db/connect");

const courseType = sequelize.define(
  "courseType",
  {
    courseId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      
    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseUniquePrefix: {
       Unique:true
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
    tableName: "courseType",
  }
);
courseType.belongsTo(courseCategory, {
  foreignKey: "categoryId"
});

courseContent.belongsTo(subCourse, { foreignKey: "subCourseId" });
// Export the ComponentType model
module.exports = courseType;
