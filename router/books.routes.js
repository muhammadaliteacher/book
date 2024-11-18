const {Router} = require("express")
const { getBooks, addBook, updateBook, deleteBook, getOneBook, search } = require("../controller/books_ctr")
const { bookValidator } = require("../validator/book.validate")
const verifyAccessToken = require("../middleware/accessToken.middleware")

const bookRouter = Router()

bookRouter.get("/get_books", getBooks)
bookRouter.get("/get_one/:id", getOneBook)
bookRouter.get("/search", search)
bookRouter.post("/add_book", [verifyAccessToken, bookValidator], addBook)
bookRouter.put("/update_book/:id",[verifyAccessToken, bookValidator], updateBook)
bookRouter.delete("/delete_book/:id", verifyAccessToken, deleteBook)

module.exports = bookRouter