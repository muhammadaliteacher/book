const BooksScheams = require("../schemas/book.schemas");

const getBooks = async (req, res, next) => {
  try {
    const books = await BooksScheams.find().populate("author_info", "-bio -_id")

    res.json(books);
  } catch (err) {
    next(err);
  }
};

const getOneBook = async (req, res, next) => {
  try {
    const book = await BooksScheams.findById(req.params.id)
    if (!book) {
      res.json({
        message: "Not found"
      })
    }
    res.json(book);
  } catch (err) {
    next(err);
  }
};

const search = async (req, res, next) => {
  try {
    const { title } = req.query

    const searchResult = await BooksScheams.find({
      title: {$regex: title, $options: "i"}
    })

    res.json(searchResult)

  } catch (error) {
    next(error)
  }
}

const addBook = async (req, res, next) => {
  try {
    const { title, author, rate, page, publish, genre, publishHome, description, author_info } = req.body;

    await BooksScheams.create({ title, author, rate, page, publish, genre, publishHome, description, author_info });

    res.json({
      message: "Added new book",
    });
  } catch (err) {
    next(err);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, author, rate, page, publish, genre, publishHome, description, author_info } = req.body;

    const foundedBook = await BooksScheams.findById(id)

    if (!foundedBook) {
      res.json({
        message: "Book not found"
      })
    }

    let result = await BooksScheams.findByIdAndUpdate(id,
      { title, author, rate, page, publish, genre, publishHome, description, author_info},
      { new: true });

    res.json({
      message: "Updated new book",
      result,
    });
  } catch (error) {
    next(error.message);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundedBook = await BooksScheams.findById(id)

    if (!foundedBook) {
      res.json({
        message: "Book not found"
      })
    }

    await BooksScheams.findByIdAndDelete(id);

    res.json({
      message: "Deleted a book",
    });
  } catch (error) {
    next(error.message);
  }
};

module.exports = {
  getBooks,
  addBook,
  search,
  updateBook,
  deleteBook,
  getOneBook
};
