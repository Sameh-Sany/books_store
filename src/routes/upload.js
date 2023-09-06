const express = require("express");
const multer = require("multer");
const successResponse = require("../helpers/successResponse");
const InternalError = require("../helpers/errors/InternalError");
const ValidationError = require("../helpers/errors/ValidationError");
const fs = require("fs");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.readdirSync("./uploads");
      cb(null, "uploads");
    } catch (error) {
      fs.mkdirSync("./uploads", null, true);
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split(".");
    const extIndex = ext.length - 1;
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext[extIndex]);
  },
});

const upload = multer({ storage: storage }).array("file", 6);

router.post("/", upload, (req, res, next) => {
  const file = req.files;
  if (!file || file.length < 1) {
    return next(new ValidationError({ file: "validation" }));
  }
  try {
    const fileRes = { ...file };
    return res.json(successResponse({ files: Object.values(fileRes) }));
  } catch (error) {
    console.log(error);
    return next(new InternalError(error));
  }
});

module.exports = router;
