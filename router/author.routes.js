const { Router } = require("express")
const { getAuthors, getOneAuthor, addAuthor } = require("../controller/author.controller")
const { authorValidate } = require("../middleware/author.validate.middleware")

const authorRouter = Router()

authorRouter.get("/get_authors", getAuthors)
authorRouter.get("/get_one/:id", getOneAuthor)
authorRouter.post("/add_author", authorValidate, addAuthor)

module.exports = authorRouter