//Requiring the necessary packages
const { StatusCodes } = require("http-status-codes");
const asyncWrapper = require("../../middleware/async");
const {editUserService} = require("../../services/signUpService");
const { configurations } = require("../../config/config");
const { logger } = require("../../logs/logger");

// Add user request
exports.editUser = asyncWrapper(async (req, res) => {
  logger.info(configurations.logger.addUserLogger);


  const {
    employeeId,
   updatedData,
    updatedBy
  } = req.body;

  const result = await editUserService(
    employeeId,
    updatedData,
     updatedBy
  );

  res.status(StatusCodes.OK).json(result);
});
