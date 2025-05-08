//Requiring the necessary packages
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../../middleware/async");
const {addUserService} = require("../../services/signUpService");
const { configurations } = require("../../config/config");
const { logger } = require("../../logs/logger");

// Add user request
exports.addUser = asyncWrapper(async (req, res) => {
  logger.info(configurations.logger.addUserLogger);


  const {
    employeeId,
   email,
    roleTypeId,
    userName,
    createdBy
  } = req.body;

  const result = await addUserService(
    employeeId,
    email,
    roleTypeId,
    userName,
    createdBy
  );

  res.status(StatusCodes.OK).json(result);
});
