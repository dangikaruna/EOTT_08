//Requiring the necessary packages
const express = require("express");
const app = express();
const helmet = require("helmet");
const notFound = require("./middleware/notFound");
const bodyParser = require("body-parser");
const cors = require("cors");

const corsOptions = {
  origin: "*", // Replace with your own domain
};
app.use(cors(corsOptions));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [
          "'self'",
          "http://192.168.13.95:5001",
          "http://localhost:5001",
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "http://192.168.13.95:5001",
          "http://localhost:5001",
        ],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "http://192.168.13.95:5001",
          "http://localhost:5001",
        ],
        // reportUri: '/report-violation',
        // objectSrc: ["'self'"]
      },
    },
    referrerPolicy: { policy: "same-origin" },
  })
);
//to parse request parameters
const payloadLimit = 500 * 1024 * 1024;
app.use(bodyParser.json({ limit: payloadLimit })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: payloadLimit, extended: true }));
const jwt = require("./middleware/jsonWebToken");
app.use(jwt.verifyToken);

// Create a new router for API routes
const api = express.Router(); // Define the `api` router
app.use("", api);
//checkUserAccess = userAccess.checkUserAccess;
//Importing modules
/***************************LOGIN  & SIGNUP MODULE API*********************/
const { login } = require("./controllers/login/login");
const { addUser} = require("./controllers/user/addUser");
const { getAllUsers } = require("./controllers/user/getAllUsers");
const { editUser} = require("./controllers/user/editUser");
const { deleteUser } = require("./controllers/user/deleteUser");
/****************************************************************/
api.post("/login", login);
api.post("/addUser",addUser);

api.get("/getAllUsers",getAllUsers);
api.put("/editUser",editUser);
api.delete("/deleteUser",deleteUser);
// Use /api as a base path for all routes
app.use("", api);

//when route does not exists error message
app.use(notFound);

module.exports = app;