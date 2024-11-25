const { Router } = require("express")
const { register, verify, login, logOut } = require("../controller/auth.controller")
const verifyRefreshToken = require("../middleware/refreshToken.middleware")

const authRouter = Router()

authRouter.post("/register", register)
authRouter.post("/verify", verify)
authRouter.post("/login", login)
authRouter.post("/refresh", verifyRefreshToken)
// authRouter.post("/logout", logOut)

module.exports = authRouter