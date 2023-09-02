const express = require("express");
const router = express.Router();
const {
  signup,
  signin,
  myProfile,
  updateProfile,
} = require("../controllers/authController");
const { checkUserAuth } = require("../middlewares/checkUserAuth");
const { body } = require("express-validator");

router.post(
  "/signup",
  [
    body("username").not().isEmpty().withMessage("Username is required"),
    body("password").not().isEmpty().withMessage("Password is required"),
    body("email").isEmail().withMessage("Email is required"),
    body("age").not().isEmpty().withMessage("Age is required"),
  ],
  signup
);

router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("Email is required"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
  signin
);

router.get("/myProfile", checkUserAuth, myProfile);

router.put(
  "/updateProfile",
  checkUserAuth,
  [
    body("username").not().isEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Email is required"),
    body("age").not().isEmpty().withMessage("Age is required"),
  ],
  updateProfile
);

module.exports = router;
