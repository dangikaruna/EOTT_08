
// //Requiring the necessary packages
// const jwt = require("jsonwebtoken");
// const { configurations } = require("../config/config");
// const { StatusCodes } = require("http-status-codes");
// const { logger } = require("../logs/logger");
// const io = require("../bin/www");
// const jwksRsa = require("jwks-rsa");

// const tenantId = configurations.ssoCredentials.tenantId;
// const clientId = configurations.ssoCredentials.applicationId;
// const loginUrl = configurations.ssoLoginUrl(tenantId);

// //Without SSO JWT verification
// exports.verifyToken = async (req, res, next) => {
//   const path = req.path;
//   const publicRoutes = configurations.PublicRoutes;

//   if (publicRoutes.includes(path)) {
//     return next();
//   }
//   const authHeader = req.header("Authorization");
//   // Check if the Authorization header is present and starts with "Bearer"

//   if (!authHeader?.startsWith("Bearer")) {
//     io.io.emit("loginerror", {
//       status: 2,
//       data: "Access denied. No token provided.",
//     });
//     return res
//       .status(StatusCodes.OK)
//       .json({ status: 2, data: "Access denied. No token provided." });
//   }

//   let token = authHeader.split(" ")[1];
//   try {
//     if (token) {
//       jwt.verify(token, configurations.jwtSecret, (err, decoded) => {
//         if (err) {
//           logger.error(err.stack);
//           if (err.name === "TokenExpiredError") {
//             io.io.emit("loginerror", { status: 2, token: token });
//             return res.status(StatusCodes.OK).json({
//               status: 2,
//               data: "Token has expired",
//             });
//           } else {
//             io.io.emit("loginerror", {
//               status: 2,
//               data: "Invalid token",
//               token: token,
//             });
//             return res
//               .status(StatusCodes.OK)
//               .json({ status: 2, data: "Invalid token" });
//           }
//         } else {
//           const { gid } = decoded;

//           req.user = gid;
//           return next();
//         }
//       });
//     }
//   } catch (error) {
//     logger.error(error.stack);
//     //returning a response indicating an invalid token.
//     io.io.emit("loginerror", {
//       status: 2,
//       data: "Invalid token.",
//       token: token,
//     });
//     return res
//       .status(StatusCodes.OK)
//       .json({ status: 2, data: "Invalid token." });
//   }
// };

// // Middleware for validating Azure AD JWT tokens
// exports.verifyTokenForSSO = (req, res, next) => {
//   const authHeader = req.header("Authorization");
//   if (!authHeader?.startsWith("Bearer")) {
//     logger.error("Access denied. No token provided.");
//     io.io.emit("loginerror", {
//       status: 2,
//       data: "Access denied. No token provided.",
//     });
//     return res
//       .status(StatusCodes.OK)
//       .json({ status: 2, data: "Access denied. No token provided." });
//   }

//   const token = authHeader?.split(" ")[1]; // Bearer token
//   const idToken = token.split("|")[0];
//   const accessToken = token.split("|")[1];

//   try {
//     if (!token) {
//       logger.error("Access denied. No token provided.");
//       io.io.emit("loginerror", {
//         status: 2,
//         data: "Access denied. No token provided.",
//       });
//       return res
//         .status(StatusCodes.OK)
//         .json({ status: 2, data: "Access denied. No token provided." });
//     }

//     // Set up JWKS client to fetch public keys from Azure Entra ID
//     const jwksClient = jwksRsa({
//       jwksUri: loginUrl,
//       // cache: true, // Caches the public keys
//       // rateLimit: true, // Rate limit the requests to prevent overload
//     });

//     // Decode the JWT token to get the kid (key ID)
//     const decodedToken = jwt.decode(idToken, { complete: true });

//     if (!decodedToken) {
//       logger.error("Invalid token");
//       io.io.emit("loginerror", {
//         status: 2,
//         data: "Invalid token",
//       });
//       return res
//         .status(StatusCodes.OK)
//         .json({ status: 2, data: "Invalid token" });
//     }

//     // Get the key using the kid
//     const kid = decodedToken?.header?.kid;

//     jwksClient.getSigningKey(kid, (err, key) => {
//       if (err) {
//         logger.error(err.stack);
//         io.io.emit("loginerror", {
//           status: 2,
//           data: "Could not connect to server, try again later.",
//         });
//         return res.status(StatusCodes.OK).json({
//           status: 2,
//           data: "Could not connect to server, try again later.",
//         });
//       }

//       const signingKey = key.getPublicKey(); // Get the public key to verify the token
//       let aud = configurations.ssoAud(clientId);
//       // let aud = configurations.ssoAud(tenantId);
//       let issuer = configurations.ssoIssuer(tenantId);

//       // Verify the token using the public key
//       jwt.verify(
//         idToken,
//         signingKey,
//         {
//           audience: aud, // Application (client) ID of your API
//           issuer: issuer, // Issuer for your tenant
//         },
//         (err, decoded) => {
//           if (err) {
//             if (err.name === "TokenExpiredError") {
//               const decodedAccessToken = jwt.decode(accessToken, {
//                 complete: true,
//               });
//               let decodedAccessPayload = decodedAccessToken?.payload;

//               let expTime = decodedAccessPayload?.exp;
//               let currenttime = new Date().getTime() / 1000;

//               if (currenttime < expTime) {
//                 // Token is valid
//                 req.user = decoded; // Attach the decoded token data (user info) to the request
//                 next(); // Continue to the next middleware or route handler
//               } else {
//                 logger.error(err.stack);
//                 io.io.emit("loginerror", { status: 2, token: token });
//                 return res.status(StatusCodes.OK).json({
//                   status: 2,
//                   data: "Token has expired",
//                 });
//               }
//             } else {
//               logger.error(err.stack);
//               io.io.emit("loginerror", {
//                 status: 2,
//                 data: "Invalid token",
//                 token: token,
//               });
//               return res
//                 .status(StatusCodes.OK)
//                 .json({ status: 2, data: "Invalid token" });
//             }
//           } else {
//             // Token is valid
//             req.user = decoded; // Attach the decoded token data (user info) to the request
//             next(); // Continue to the next middleware or route handler
//           }
//         }
//       );
//     });
//   } catch (error) {
//     logger.error(error.stack);
//     //returning a response indicating an invalid token.
//     io.io.emit("loginerror", {
//       status: 2,
//       data: "Invalid token.",
//       token: token,
//     });
//     return res
//       .status(StatusCodes.OK)
//       .json({ status: 2, data: "Invalid token." });
//   }
// };
//Requiring the necessary packages
const jwt = require("jsonwebtoken");
const { configurations } = require("../config/config");
const { StatusCodes } = require("http-status-codes");
const { logger } = require("../logs/logger");

exports.verifyToken = async (req, res, next) => {
  const path = req.path;
  const publicRoutes = configurations.PublicRoutes;

  if (publicRoutes.includes(path)) {
    return next();
  }

  const authHeader = req.header("Authorization");

  if (!authHeader?.startsWith("Bearer")) {
    return res
      .status(StatusCodes.OK)
      .json({ status: 2, data: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, configurations.jwtSecret, (err, decoded) => {
      if (err) {
        logger.error(err.stack);
        if (err.name === "TokenExpiredError") {
          return res
            .status(StatusCodes.OK)
            .json({ status: 2, data: "Token has expired" });
        } else {
          return res
            .status(StatusCodes.OK)
            .json({ status: 2, data: "Invalid token" });
        }
      } else {
        const { gid } = decoded;
        req.user = gid;
        return next();
      }
    });
  } catch (error) {
    logger.error("Something went wrong!");
    return res
      .status(StatusCodes.OK)
      .json({ status: 2, data: "Invalid token." });
  }
};
