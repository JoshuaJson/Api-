const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

let checkAuth = (req, res, next) => {
  let token = req.get("token");

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: "error",
        error: err
      });
    }

    req.userData = decoded.userData;

    next();
  });
};

module.exports = { checkAuth };
