const log = require("../logs/logger");

const notFound = (req, res) => {
  log.logger.error(`The API path "${req.path}" is not found`);
  return res.status(404).send("Route does not exist");
};

module.exports = notFound;