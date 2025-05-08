// Validate user by gid and email


const { hashPassword } = require("./password");
const roleType = require("../models/user/roleType");
const user = require("../models/user/user");

// Find access type by accessTypeId
const findRoleTypeId = async (roleTypeId) => {
    return await roleType.findOne({ where: { roleTypeId } });
  };
  // Hash password
const hashedPassword = async (password) => {
    return await hashPassword(password);
  };

const userValidation = async (email) => {

    let validateUser = await user.findOne({
        where: { email: email, isDelete: 0 },
    });
    if (validateUser) {
        return true;
    }

    return false;
};


module.exports = {
    findRoleTypeId,
    hashedPassword,
    userValidation,

  };
  