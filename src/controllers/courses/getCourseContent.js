const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../../middleware/async");
const { getCourseContentService } = require("../../services/coursesServices");

exports.getCourseContent = asyncWrapper(async (req, res) => {
  const { userId, contentId } = req.body;
  await getCourseContentService(userId, contentId, res); // <-- Important
});
