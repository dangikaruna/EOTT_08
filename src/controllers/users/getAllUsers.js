const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../../middleware/async");
const { getAllViewerAndContributors } = require("../../services/userService");

exports.getAllUsers = asyncWrapper(async (req, res) => {
  const { userId } = req.body;
  const result = await getAllViewerAndContributors(userId);
  res.status(StatusCodes.OK).json(result);
});
