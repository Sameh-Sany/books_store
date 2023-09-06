const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const successResponse = require("../helpers/successResponse");
const { validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// signup user

exports.signup = async (req, res, next) => {
  try {
    const { username, password, email, age, image } = req.body;

    // check if validation errors exist
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    // check if user exists
    const emailExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (emailExists) {
      return res.status(400).json({ message: "User email already exists" });
    }

    const user = await prisma.user.create({
      data: {
        username,
        password: bcrypt.hashSync(password, 10),
        email,
        age,
        image,
      },
    });

    delete user.password;

    // create token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.status(201).json(
      successResponse({
        user: user,
        token: "Bearer " + token,
      })
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

// signin user

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if validation errors exist
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    // check if user not exists
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // check if password is correct
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    delete user.password;

    // create token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.status(200).json(
      successResponse({
        user: user,
        token: "Bearer " + token,
      })
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

exports.myProfile = async (req, res, next) => {
  try {
    // check if validation errors exist
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    delete user.password;

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    return res.status(200).json(successResponse(user));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { username, email, age } = req.body;

    // check if validation errors exist
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    if (email !== user.email) {
      const emailExists = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (emailExists) {
        return res.status(400).json({ message: "User email already exists" });
      }
    }

    user.username = username;
    user.email = email;
    user.age = age;
    await user.save();

    delete user.password;

    return res.status(200).json(successResponse(user));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};
