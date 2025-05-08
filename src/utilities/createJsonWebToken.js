const jwt = require("jsonwebtoken");
const { configurations } = require("../config/config");

//function to create jwt with username and userrole
const createJwt = async (gid) => {
  return jwt.sign({ gid: gid }, configurations.jwtSecret, {
    expiresIn: configurations.jwtLifetime,
  });
};
module.exports = {
  createJwt,
};
