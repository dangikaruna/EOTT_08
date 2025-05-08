/*
 *************************************************************************************************************
 * License Information :Alten Global Technology Solutions Private Limited.                  	               *
 *                      #37, Krishna Reddy Colony, Domlur layout,            				                         *
 *                      Domlur,Bangalore - 560071, INDIA                    				                         *
 *                      Licensed software and All rights reserved.           		                             *
 *************************************************************************************************************
 * File             : login.js									                                                             *
 *													                                                                                 *
 * Description      :  To login the user with the given gid and password. 		                               *
 *													                                                                                 *
 * Author(s)        : Maithri R								                                                               *					    					                                                                                       *
 * Version History:											                                                                     *
 * <Version Number>                 <Author>              <date>      <defect Number>      <Modification	   *
 *                                                                                          made and the     *
 *                                                                                          reason for	     *
 *                                                                                          modification >   *
 *  1.0                			 Maithri R	            14.08.2023        --               initial version	     *
 *													                                                                                 *
 * References        : None.								                                                                 *
 *                     											                                                                 *
 * Assumption(s)     : None.										                                                             *
 *                     										                                                                   *
 * Constraint(s)     : None.										                                                             *
 *                     											                                                                 *
 *************************************************************************************************************
 */
// Importing the necessary module
const { StatusCodes } = require("http-status-codes");
const { logger } = require("../../logs/logger");
const asyncWrapper = require("../../middleware/async");
const loginService = require("../../services/loginService");
const { configurations } = require("../../config/config");

// Exported function for handling login endpoint
exports.login = asyncWrapper(async (req, res) => {
  logger.info(configurations.logger.loginLogger);

  const { email, password } = req.body;
  const { authorization } = req.headers;
  const token =
    authorization !== undefined &&
    authorization !== null &&
    authorization !== ""
      ? authorization.split(" ")[1]
      : "";
  // Call the login function from loginService

  const result = await loginService.login(email, password);
  res.status(StatusCodes.OK).json(result);
});
