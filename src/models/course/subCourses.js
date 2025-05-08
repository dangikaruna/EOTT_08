const { DataTypes, UniqueConstraintError } = require("sequelize");
const sequelize = require("../../db/connect");

const subCourse = sequelize.define(
  "subCourses",
  {
    subCoursesId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,

    },
   subCouseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    coursePathDetails: {
      type: DataTypes.JSON
    },
    ContentType: {
      type: DataTypes.STRING
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
    tableName: "subCourse",
  }
);
subCourse.belongsTo(courseType, 
  { foreignKey: "courseId" }
);
subCourse.belongsTo(courseCategory, 
  { foreignKey: "categoryId" }
);
// Export the ComponentType model
module.exports = subCourse;
;
