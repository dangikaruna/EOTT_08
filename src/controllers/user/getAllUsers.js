/*
 *************************************************************************************************************
 * License Information :Alten Global Technology Solutions Private Limited.                  	               *
 *                      #37, Krishna Reddy Colony, Domlur layout,            				                         *
 *                      Domlur,Bangalore - 560071, INDIA                    				                         *
 *                      Licensed software and All rights reserved.           		                             *
 *************************************************************************************************************
 * File             : getAllUser.js									                                                         *
 *													                                                                                 *
 * Description      :  To get all the user. 		                                                             *
 *													                                                                                 *
 * Author(s)        : Karuna D							                                                               *					    					                                                                                       *
 * Version History:											                                                                     *
 * <Version Number>                 <Author>              <date>      <defect Number>      <Modification	   *
 *                                                                                          made and the     *
 *                                                                                          reason for	     *
 *                                                                                          modification >   *
 *  1.0                			  Karuna D	            21.04.2025        --               initial version	     *
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
const signUpService = require("../../services/signUpService");
const { configurations } = require("../../config/config");

//To get all the users
exports.getAllUsers = asyncWrapper(async (req, res) => {
  logger.info(configurations.logger.getAllUsersLogger);
  // Call the getAllUsers function from loginService
  const result = await signUpService.getAllUsersService();
  res.status(StatusCodes.OK).json(result);
});
