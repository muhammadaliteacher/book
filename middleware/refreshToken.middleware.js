const jwt = require("jsonwebtoken")
const {generateAccessToken} = require("../utils/token.generate")

const verifyRefreshToken = (req, res) => {
  const token = req.cookies.refreshToken

  if(!token) {
    return res.status(401).json({
      message: "refreshToken not found, please login again!"
    })
  }

  const decoded = jwt.verify(token, process.env.REFRESH_SEKRET_KEY)
  req.user = decoded

  if(!decoded){
    return res.status(403).json({
      message: "Invalid refreshToken or token expired!"
    })
  }

  const accessToken = generateAccessToken({id: req.user.id, email: req.user.email, role: req.user.role})
  
  res.cookie("accessToken", accessToken, {httpOnly: true, maxAge: process.env.COOKIE_ACCESS_TIME})

  res.json({
    message: "refreshToken updated",
    accessToken
  })
}

module.exports = verifyRefreshToken