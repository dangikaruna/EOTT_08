const asyncWrapper = require("../../middleware/async");
const { StatusCodes } = require("http-status-codes");
const {
  addNewCourseCategoryService,
} = require("../../services/courseCategory");

exports.addNewCourseCategory = asyncWrapper(async (req, res) => {
  const { courseCategoryName, username } = req.body;
  const result = await addNewCourseCategoryService(
    courseCategoryName,
    username
  );
  res.status(StatusCodes.OK).json(result);
});
