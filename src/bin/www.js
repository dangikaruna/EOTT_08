
//Requiring the necessary packages
const http = require("http");
const https = require("https");


//Requiring the necessary files
const app = require("../app.js");
const config = require("../config/config");
const connectDb = require("../db/connect");
let protocol = http;
let protocolName = "http";
let options = {};
function normalize(val) {
    let port = parseInt(val);
  
    if (isNaN(port)) {
      return val;
    }
    if (port > 0) {
      return port;
    }
  
    return false;
  }
  const port = normalize(
    process.env.PORT || config.configurations.AltenApplication.port
  );
  
  //Checking for protocol configurations (http/https).
  if (config.configurations.httpsEnable === true) {
    protocol = https;
    protocolName = "https";
    options = config.configurations.httpsOptions;
  }
  //Create a new server.
  const server = config.configurations.httpsEnable
  ? protocol.createServer(options, app)
  : protocol.createServer(app);
try {
  server.listen(
    port,
    config.configurations.AltenApplication.host,
    function () {
      console.log(
        "Server running on " +
          protocolName +
          "://" +
          config.configurations.AltenApplication.host+
          ":" +
          port
      );
      server.timeout = config.configurations.timeOut;
    }
  );
 
} catch (error) {
  console.log(error);
}