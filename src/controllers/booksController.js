// const successResponse = require("../helpers/successResponse");
// const { validationResult } = require("express-validator");
// const Book = require("../models/book");

// // get all books
// exports.getAllBooks = async (req, res) => {
//   try {
//     const books = await Book.findAll();
//     return res.status(200).json(successResponse({ books }));
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };

// // get book by id

// exports.getBookById = async (req, res) => {
//   try {
//     const book = await Book.findOne({ where: { id: req.params.id } });
//     if (!book) {
//       return res.status(400).json({ message: "Book does not exist" });
//     }
//     return res.status(200).json(successResponse({ book }));
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };

// // create book

// exports.createBook = async (req, res) => {
//   try {
//     const { title, categoryId, price, description } = req.body;

//     // check if validation errors exist
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ message: errors.array() });
//     }

//     const book = await Book.create({
//       title,
//       categoryId,
//       price,
//       description,
//     });
//     return res.status(201).json(successResponse({ book }));
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };

// // update book

// exports.updateBook = async (req, res) => {
//   try {
//     const { title, categoryId, price, description } = req.body;

//     // check if validation errors exist
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ message: errors.array() });
//     }

//     const book = await Book.update(
//       {
//         title,
//         categoryId,
//         price,
//         description,
//       },
//       { where: { id: req.params.id } }
//     );
//     return res.status(200).json(successResponse({ book }));
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };

// // delete book

// exports.deleteBook = async (req, res) => {
//   try {
//     const book = await Book.destroy({ where: { id: req.params.id } });

//     return res.status(200).json(successResponse({ book }));
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };
