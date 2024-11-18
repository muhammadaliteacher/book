const jwt = require("jsonwebtoken")
require("dotenv").config()

const generateAccessToken = (paylod) => {
  return jwt.sign(paylod, process.env.ACCESS_SEKRET_KEY, {expiresIn: process.env.ACCESS_JWT_TIME})
}

const generateRefreshToken = (paylod) => {
  return jwt.sign(paylod, process.env.REFRESH_SEKRET_KEY, {expiresIn: process.env.REFRESH_JWT_TIME})
}

module.exports = {
  generateAccessToken,
  generateRefreshToken
}