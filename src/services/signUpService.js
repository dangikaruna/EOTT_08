const roleType = require("../models/user/roleType");
const { configurations } = require("../config/config");
const { logger } = require("../logs/logger");
const sequelize = require("../db/connect");
const io = require("../bin/www");
const user = require("../models/user/user");
const {
    findRoleTypeId,
    findEmail,
    findUser,
    hashedPassword,
    userValidation,
    fetchUsersData,
} = require("../utilities/signupFunctions");
const usr = require("../models/user/user");

const addUserService = async (
    employeeId,
    email,
    roleTypeId,
    userName,
    createdBy
) => {
    // Check if any required parameter is missing
    if (!employeeId || !email || !roleTypeId || !createdBy) {
        return {
            status: 0,
            data: configurations.Messages.signUp.provideSignUpDetails,
        };
    }
    try {


        // Check if user with given email already exists
        const validateUser = await userValidation(email);
        if (validateUser === true) {
            return {
                status: 0,
                data: configurations.Messages.signUp.userAlreadyExists,
            };
        }

        // Hash the password
        const hashedPasswordValue = await hashedPassword("default@123");
        ;// Create a new user
        const newUser = await user.create({
            employeeId:employeeId,
            userName: userName || "",
            email: email,
            roleTypeId: roleTypeId,
            password: hashedPasswordValue,
            createdBy: createdBy,
        });


        return {
            status: 1,
            data: "User added successfully",
            // userObj: newUser, //forTesting
        };
    } catch (error) {
        logger.error(error.stack);
        return {
            status: 0,
            data: configurations.Messages.signUp.cantSignUp,
        };
    }
};
/****************************** GET ALL USERS **************************/
const getAllUsersService = async () => {
    try {
      // Fetching all users
      const users = await user.findAll();
      if (users.length == 0) {      
        return { 
          status: 0,           
          data: configurations.Messages.common.noData,        
         };        
        }    
    // Clean the users to JSON
    const cleanUsers = users.map((userInstance) => {
      const userData = userInstance.get({ plain: true });

      Object.keys(userData).forEach((key) => {
        if (userData[key] === null) {
          userData[key] = "";
        }
      });

      return userData;
    });

      return {
        status: 1,
        data: users,
      };
    } catch (error) {
      logger.error(error.stack);
      return {
        status: 0,
        data: configurations.Messages.common.error,
      };
    }
  };
// Edit (Update) user
const editUserService = async (employeeId,
  updatedData,
   updatedBy) => {
  try {
    // Find user by ID
    const user = await user.findByPk(employeeId);
    if (user.length == 0) {      
      return { 
        status: 0,           
        data: configurations.Messages.common.noData,        
       };        
      } 

    // Update user
    await user.update(updatedData);

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteUserService = async (employeeId) => {
  try {
    // Find user by employeeId
    const user = await user.findByPk(employeeId);

    if (!user) {
      return {
        status: 0,
        data: configurations.Messages.common.noData,
      };
    }

    // Delete user
    await user.destroy();

    return {
      status: 1,
      data: "User deleted successfully",
    };
  } catch (error) {
    console.error(error.stack);
    return {
      status: 0,
      data: configurations.Messages.common.error,
    };
  }
};


module.exports = {

    addUserService,
    getAllUsersService,
    editUserService,
    deleteUserService,


};
