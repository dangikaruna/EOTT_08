
const user = require("../models/user/user");
const { hashPassword } = require("./password");
// Find user by gid
const findEmailFromUser = async (email) => {
  console.log("email",email);
  
    return await user.findOne({
      where: { email: email },
    });
  };
  module.exports = {
    
    findEmailFromUser
   
  };