const CourseCategory = require("../models/course/courseCategory");
const user = require("../models/user/user");
const roleType = require("../models/user/roleType");
const { logger } = require("../logs/logger");
const { configurations } = require("../config/config");
const uploadCoursePath = configurations.rootFolderOfCourse;
const addNewCourseCategoryService = async (courseCategoryName, username) => {
  if (!username || !courseCategoryName) {
    return {
      status: 0,
      data: configurations.Messages.common.provideDetails,
    };
  }
  try {
    const findExistingCourseCategoryName = await CourseCategory.findOne({
      where: { categoryName: courseCategoryName },
    });
    if (findExistingCourseCategoryName) {
      return {
        status: 0,
        data: "This course category already exist..",
      };
    }
    await CourseCategory.create({
      categoryName: courseCategoryName,
      createdBy: username,
    });
    return {
      status: 1,
      data: `${courseCategoryName} created successfully.`,
    };
  } catch (error) {
    logger.error(error.stack);
    return {
      status: 0,
      data: configurations.Messages.common.error,
    };
  }
};

module.exports = {
  addNewCourseCategoryService,
};
