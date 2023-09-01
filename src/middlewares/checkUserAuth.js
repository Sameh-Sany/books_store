const User = require("../models/user");

exports.checkUserAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: decodedToken.id } });
    if (!user) {
      res.status(400).json({ message: "User does not exist" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
