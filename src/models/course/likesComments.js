const { DataTypes } = require("sequelize");
const sequelize = require("../../db/connect");

// Import related models
const courseType = require("./courseType");
const subCourse = require("./subCourse");
const courseCategory = require("./courseCategory");

const likesComments = sequelize.define(
  "likesComments",
  {
    likesCommentsId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },

    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    subCourseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    contentId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Optional if specific content
    },

    commentType: {
      type: DataTypes.ENUM("like", "dislike", "comment"),
      allowNull: false,
    },

    comment: {
      type: DataTypes.TEXT,
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
    tableName: "likesComments",
  }
);

// Define associations
likesComments.belongsTo(courseType, {
  foreignKey: "courseId",
  as: "courseType",
});

likesComments.belongsTo(subCourse, {
  foreignKey: "subCourseId",
  as: "subCourse",
});

likesComments.belongsTo(courseCategory, {
  foreignKey: "categoryId",
  as: "category",
});

module.exports = likesComments;
