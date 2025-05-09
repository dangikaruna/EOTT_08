//Requiring the necessary packages
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../../middleware/async");
const {deleteUserService} = require("../../services/signUpService");
const { configurations } = require("../../config/config");
const { logger } = require("../../logs/logger");

// Add user request
exports.deleteUser = asyncWrapper(async (req, res) => {
  logger.info(configurations.logger.addUserLogger);


  const {
    employeeId,
  } = req.body;

  const result = await deleteUserService(
    employeeId,
  );

  res.status(StatusCodes.OK).json(result);
});
