const { configurations } = require("../config/config");
const { logger } = require("../logs/logger");
const user = require("../models/user/user");
const getAllViewerAndContributors = async (userId) => {
  if (!userId) {
    return {
      status: 0,
      data: configurations.Messages.common.provideDetails,
    };
  }
  try {
    const allViewerAndContributors = await user.findAll({
      where: {
        roleTypeId: [1, 2],
      },
    });
    let result = [];
    allViewerAndContributors.forEach((user) => {
      if (user.dataValues.userId !== userId) {
        result.push({
          userId: user.dataValues.userId,
          email: user.dataValues.email,
        });
      }
    });
    return {
      status: 1,
      data: result,
    };
  } catch (error) {
    console.log(error);
    logger.error(error.stack);
    return {
      stauts: 0,
      data: configurations.Messages.common.error,
    };
  }
};
const giveAccessOfCourseToUserService = async (contentId, authorId, userId) => {
  // Validate input parameters
  if (!contentId || !authorId || !userId) {
    return {
      status: 0,
      data: configurations.Messages.common.provideDetails,
    };
  }

  try {
    // Fetch the author's name
    const findAuthorName = await user.findOne({ where: { userId: authorId } });
    if (!findAuthorName) {
      return {
        status: 0,
        data: "Author not found.",
      };
    }
    const nameOfAuthor = findAuthorName.dataValues.userName; // Assuming username is 'userName' in the database

    // Fetch the user to whom access is being granted
    const result = await user.findOne({ where: { userId: userId } });
    if (!result) {
      return {
        status: 0,
        data: "User not found.",
      };
    }

    // Prepare the new course access data
    const courseAccessData = {
      contentId: contentId,
      accessGivenBy: nameOfAuthor,
      contentMetaData: "0", // Initializing starting point of the video to "00"
      markasComplete: false,
    };

    // If there's existing course access, append the new access
    const updatedCourseAccessGiven = result.courseAccesGiven
      ? [...result.courseAccesGiven, courseAccessData] // Append new access
      : [courseAccessData]; // If no previous data, create an array with the first access

    // Update the user's courseAccesGiven field
    await result.update({ courseAccesGiven: updatedCourseAccessGiven });

    return {
      status: 1,
      data: `Access given to ${result.dataValues.userName} successfully.`,
    };
  } catch (error) {
    console.error(error);
    logger.error(error.stack);
    return {
      status: 0,
      data: configurations.Messages.common.error,
    };
  }
};

module.exports = {
  getAllViewerAndContributors,
  giveAccessOfCourseToUserService,
};
