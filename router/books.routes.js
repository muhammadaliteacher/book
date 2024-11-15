const {Router} = require("express")
const { getBooks, addBook, updateBook, deleteBook, getOneBook, search } = require("../controller/books_ctr")
const { bookValidator } = require("../validator/book.validate")

const bookRouter = Router()

bookRouter.get("/get_books", getBooks)
bookRouter.get("/get_one/:id", getOneBook)
bookRouter.get("/search", search)
bookRouter.post("/add_book", bookValidator, addBook)
bookRouter.put("/update_book/:id",bookValidator, updateBook)
bookRouter.delete("/delete_book/:id", deleteBook)

module.exports = bookRouter