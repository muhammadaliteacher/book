const jwt = require("jsonwebtoken")

const verifyAccessToken = (req, res, next) => {
  const { accessToken } = req.cookies

  if(!accessToken) {
    return res.status(401).json({
      message: "accessToken not found, please login again!"
    })
  }

  jwt.verify(accessToken, process.env.ACCESS_SEKRET_KEY, (err, decoded) => {
    if(err) {
      return res.status(403).json({
        message: "Invalid token or token expired, please login again!"
      })
    }
    req.user = decoded
  })

  next()
}

module.exports = verifyAccessToken