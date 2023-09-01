const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// signup user

exports.signup = async (req, res) => {
  try {
    const { username, password, email, age } = req.body;

    // check if user exists
    const emailExists = await User.findOne({ where: { email } });

    if (emailExists) {
      return res.status(400).json({ message: "User email already exists" });
    }
    const user = await User.create({
      username,
      password: bcrypt.hashSync(password, 10),
      email,
      age,
    });

    // create token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.status(201).json({ user: user, token: token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// signin user

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user not exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // check if password is correct
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // create token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.status(200).json({ user: user, token: token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
