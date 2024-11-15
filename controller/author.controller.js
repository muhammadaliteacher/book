const Authors = require("../schemas/author.schema");

const getAuthors = async (req, res, next) => {
  try {
    const authors = await Authors.find()

    res.json(authors);
  } catch (err) {
    next(err);
  }
};

const getOneAuthor = async (req, res, next) => {
  try {
    const author = await Authors.findById(req.params.id)
    if (!author) {
      res.json({
        message: "Author not found"
      })
    }
    res.json(author);
  } catch (err) {
    next(err);
  }
};

// const search = async (req, res, next) => {
//   try {
//     const { title } = req.query

//     const searchResult = await BooksScheams.find({
//       title: {$regex: title, $options: "i"}
//     })

//     res.json(searchResult)

//   } catch (error) {
//     next(error)
//   }
// }

const addAuthor = async (req, res, next) => {
  try {
    const { first_name,
      last_name,
      date_of_birth,
      date_of_death,
      country,
      bio,
      works,
      image } = req.body;

    await Authors.create({ first_name,
      last_name,
      date_of_birth,
      date_of_death,
      country,
      bio,
      works,
      image });

    res.json({
      message: "Added new author",
    });
  } catch (err) {
    next(err);
  }
};

// const updateBook = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { title, author, rate, page, publish, genre, publishHome, description, } = req.body;

//     const foundedBook = await BooksScheams.findById(id)

//     if (!foundedBook) {
//       res.json({
//         message: "Book not found"
//       })
//     }

//     let result = await BooksScheams.findByIdAndUpdate(id,
//       { title, author, rate, page, publish, genre, publishHome, description, },
//       { new: true });

//     res.json({
//       message: "Updated new book",
//       result,
//     });
//   } catch (error) {
//     next(error.message);
//   }
// };

// const deleteBook = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const foundedBook = await BooksScheams.findById(id)

//     if (!foundedBook) {
//       res.json({
//         message: "Book not found"
//       })
//     }

//     await BooksScheams.findByIdAndDelete(id);

//     res.json({
//       message: "Deleted a book",
//     });
//   } catch (error) {
//     next(error.message);
//   }
// };

module.exports = {
  getAuthors,
  getOneAuthor,
  addAuthor
};
