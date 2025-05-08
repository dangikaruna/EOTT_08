// Import necessary modules
const { DataTypes, UniqueConstraintError } = require("sequelize");
const sequelize = require("../../db/connect");

const courseContent = sequelize.define(
  "courseContent",
  {
    contentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      Unique: true,

    },
   
    contentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //courseUniquePrefix+sunCourseUniquePrefix+id
   contentPrefix: {
      Unique: true
    },
    contentPath: {
      type: DataTypes.JSON
    },
    // mp4,pdf,audio
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
    tableName: "courseContent",
  }
);
// Export the ComponentType model
module.exports = courseContent;
