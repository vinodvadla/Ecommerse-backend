const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      const verifiedUser = await jwt.verify(token, "vinod7144");
      req.user = verifiedUser;
      next();
    } else {
      next();
    }
  } catch (error) {
    next();
  }
};

module.exports = auth;
