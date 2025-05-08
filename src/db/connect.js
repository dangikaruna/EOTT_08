
//Requiring the necessary packages
const { Sequelize } = require("sequelize");
const fs = require("fs");
const { configurations } = require("../config/config");
const { logger } = require("../logs/logger");


let sequelize;

  sequelize = new Sequelize(
    // configurations.Database.url,
    configurations.Database.databaseName,
    configurations.Database.username,
    configurations.Database.password,
    {
      host: configurations.Database.host,
      dialect: configurations.Database.dialect,
      dialectOptions: {
        connectTimeout: 60000, // Increase the timeout value to 5 minutes (adjust as needed)
      },
      logging: false,
      pool: {
        max: 1000, // Decrease max connections to avoid overload
        min: 0,
        acquire: 10000, // Increase acquire timeout
        idle: 1000, // Increase idle timeout
      },
      keepDefaultTimezone: true,
    }
  );

sequelize
  // .sync({force: true})
  .sync({alter: true})
  .then(() => console.log("connected to the Mysql"))
  .catch((error) => {
    console.log(error);
    logger.error(error);
  });

module.exports = sequelize;
