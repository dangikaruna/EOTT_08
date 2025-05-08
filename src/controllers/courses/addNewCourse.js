const asyncWrapper = require("../../middleware/async");
const { StatusCodes } = require("http-status-codes");
const { addNewCourseService } = require("../../services/coursesServices");

exports.addNewCourse = asyncWrapper(async (req, res) => {
  const { categoryId, courseUniquePrefix, courseName, username } = req.body;
  const result = await addNewCourseService(
    categoryId,
    courseUniquePrefix,
    courseName,
    username
  );
  res.status(StatusCodes.OK).json(result);
});
