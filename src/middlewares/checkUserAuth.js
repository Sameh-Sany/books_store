const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.checkUserAuth = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({ message: "You are not authenticated!" });
    }

    const user = await User.findOne({ where: { id: decodedToken.id } });
    req.user = user;

    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
