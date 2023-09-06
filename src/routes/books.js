// const express = require("express");
// const router = express.Router();
// const { body } = require("express-validator");
// const {
//   getAllBooks,
//   getBookById,
//   createBook,
//   updateBook,
//   deleteBook,
// } = require("../controllers/booksController");
// const { checkUserAuth } = require("../middlewares/checkUserAuth");

// router.get("/", getAllBooks);

// router.get("/:id", getBookById);

// router.post(
//   "/",
//   checkUserAuth,
//   [
//     body("title").not().isEmpty().withMessage("Title is required"),
//     body("categoryId").not().isEmpty().withMessage("Category is required"),
//     body("price").not().isEmpty().withMessage("Price is required"),
//     body("description").not().isEmpty().withMessage("Description is required"),
//   ],
//   createBook
// );

// router.put(
//   "/:id",
//   checkUserAuth,
//   [
//     body("title").not().isEmpty().withMessage("Title is required"),
//     body("categoryId").not().isEmpty().withMessage("Category is required"),
//     body("price").not().isEmpty().withMessage("Price is required"),
//     body("description").not().isEmpty().withMessage("Description is required"),
//   ],
//   updateBook
// );

// router.delete("/:id", checkUserAuth, deleteBook);

// module.exports = router;
