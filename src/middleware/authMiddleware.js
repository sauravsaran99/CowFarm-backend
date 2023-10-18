const jwt = require("jsonwebtoken");
const config = require("../config/config");

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");
  console.log("token", token);
  if (!token) return res.sendStatus(401);

  jwt.verify(token, config.secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: err.message });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
