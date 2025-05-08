const bcrypt = require("bcryptjs");

//function to salt & hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);
  return newPassword;
};
//function to compare user password and stored password
const comparePassword = async (candidatePassword, userPassword) => {
  const isMatch = await bcrypt.compare(candidatePassword, userPassword);
  return isMatch;
};

//function to remove password key value pair before sending it to client/front-end
const toJson = (user) => {
  return Object.keys(user)
    .filter((key) => key !== "password")
    .reduce((obj, key) => {
      obj[key] = user[key];
      return obj;
    }, {});
};

module.exports = {
  hashPassword,
  comparePassword,
  toJson,
};
