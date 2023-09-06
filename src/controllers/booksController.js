const successResponse = require("../helpers/successResponse");
const { validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");
const primsa = new PrismaClient();

// get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await primsa.book.findMany({
      include: {
        category: true,
      },
    });

    return res.status(200).json(successResponse({ books }));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

// get book by id

exports.getBookById = async (req, res) => {
  try {
    const book = await primsa.book.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        category: true,
      },
    });

    if (!book) {
      return res.status(400).json({ message: "Book does not exist" });
    }
    return res.status(200).json(successResponse({ book }));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

// create book

exports.createBook = async (req, res) => {
  try {
    const { title, categoryId, price, description, image } = req.body;

    // check if validation errors exist
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const book = await primsa.book.create({
      data: { title, categoryId, price, description, image },
    });

    return res.status(201).json(successResponse({ book }));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

// update book

exports.updateBook = async (req, res) => {
  try {
    const { title, categoryId, price, description, image } = req.body;

    // check if validation errors exist
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const book = await primsa.book.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        title,
        categoryId,
        price,
        description,
        image,
      },
    });

    return res.status(200).json(successResponse({ book }));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};

// delete book

exports.deleteBook = async (req, res) => {
  try {
    const book = await primsa.book.delete({
      where: {
        id: Number(req.params.id),
      },
    });

    return res.status(200).json(successResponse({ book }));
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "something went wrong" });
  }
};
