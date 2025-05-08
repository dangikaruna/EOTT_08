const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../../middleware/async");
const {
  giveAccessOfCourseToUserService,
} = require("../../services/userService");

exports.giveAccessOfCourseToUser = asyncWrapper(async (req, res) => {
  const { contentId, authorId, userId } = req.body;
  const result = await giveAccessOfCourseToUserService(
    contentId,
    authorId,
    userId
  );
  res.status(StatusCodes.OK).json(result);
});
