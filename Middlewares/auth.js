const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log(token)
    if (token) {
      const verifiedUser = await jwt.verify(token, "vinod7144");
      req.user = verifiedUser;
    } else {
      res.render("login.ejs");
    }
    next();
  } catch (error) {
    res.json(error);
  }
};

module.exports = auth;
