const jwt = require("jsonwebtoken");
const user = require("../models/user/user");
const roleType = require("../models/user/roleType");
const { logger } = require("../logs/logger");
const { configurations } = require("../config/config");
const sequelize = require("../db/connect");
const { comparePassword, toJson } = require("../utilities/password");
const { createJwt } = require("../utilities/createJsonWebToken");
const message = require("../config/config").configurations.Messages.login;
const {findEmailFromUser} = require("../utilities/logInFunctions");
const { log } = require("winston");
const login = async (email, password) => {
  console.log("email, password",email, password);
  
    try {
      // Check if email or password is missing
      if (!email || !password) {
        return {
          status: 0,
          data: configurations.Messages.common.provideDetails,
        };
      }

  
      // Find user by email
      const findUser = await findEmailFromUser(email);
      
      // If user not found
      if (!findUser) {
        return {
          status: 0,
          data: message.loginFailedMessage,
        };
      }
  // console.log("findUser",findUser);
  
      // Validate password
      const isPasswordCorrect = await comparePassword(password, findUser.password);
      if (!isPasswordCorrect) {
        return {
          status: 0,
          data: message.InvalidLogin,
        };
      }
  console.log("isPasswordCorrect",isPasswordCorrect);
  
      // Prepare user object
      const userObj = findUser.dataValues ? await toJson(findUser.dataValues) : null;
  
      if (!userObj) {
        return {
          status: 0,
          data: message.InvalidLogin, // Return invalid login if user data is invalid
        };
      }
  
      // Create JWT token
      const token = await createJwt(findUser.gid);
  console.log("token", token);
  
      // Retrieve role type information
      const roleTypeNameResult = await roleType.findOne({
        where: { roleTypeId: userObj.roleTypeId },
      });
  
  
      // If roleTypeName is found
      const roleTypeNameValue = roleTypeNameResult ? roleTypeNameResult.dataValues.roleTypeName : 'Unknown';
      
 
  
      // Return success with user info and token
      return {
        status: 1,
        data: message.loginSuccessfully,
        user: userObj,
        token: token,
        roleType: roleTypeNameValue,
      };
    } catch (error) {
      console.log(error)
      // Log the error and return a generic error message
      logger.error(error.stack);
      return {
        status: 0,
        data: configurations.Messages.common.error,
      };
    }
  };
  
  module.exports = {
    
    login,
   
  };