const AuthSchema = require("../schemas/auth.schema")
const nodemailer = require("nodemailer")
const bcrypt = require("bcryptjs")
const {generateAccessToken, generateRefreshToken} = require("../utils/token.generate")
const BaseError = require("../utils/base_error")

require("dotenv").config()

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body

    const foundedUser = await AuthSchema.findOne({ email: email })

    if (foundedUser) {
        throw BaseError.BadRequest("User already exists")
    }

    const transpoter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_GOOGLE_PASS_KEY
      }
    })

    const randomNumber = Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)).join("").trim()

    const sendEmail = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Verification code of devbook",
      html: `<p>tasdiqlash kodi: <b style="color: blue; font-size: 40px;">${randomNumber}</b></p>`
    }

    await transpoter.sendMail(sendEmail, (error, info) => {
      if (error) {
       return res.json({
          message: error.message
        })
      } else {
       return res.json({
          message: info.response
        })
      }
    })

    const hash = await bcrypt.hash(password, 12)

    const userRegister = await AuthSchema.create({ username, email, password: hash, verfy_code: randomNumber })


    setTimeout(async () => {
      await AuthSchema.findByIdAndUpdate(userRegister._id, { verfy_code: "" })
    }, 60 * 1000)

    res.json({
      message: "Registered"
    })

  } catch (error) {
    next(error)
  }
}

const verify = async (req, res, next) => {
  try {
    const { email, verify_code_by_client } = req.body


    const foundedUser = await AuthSchema.findOne({ email: email })

    if (!foundedUser) {
      throw BaseError.BadRequest("User not found")
    }

    if (foundedUser.verify_code === verify_code_by_client) {
      await AuthSchema.findByIdAndUpdate(foundedUser._id, { verify: true, verfy_code: "" })

     return res.json({
        message: "Successfully verified",
      })

    } else {
      throw BaseError.BadRequest("Verify code mistake or not exists")
    }

  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try{
    const { email, password } = req.body

    const foundedUser = await AuthSchema.findOne({ email: email })

    if (!foundedUser) {
      throw BaseError.BadRequest("User not found")
    }

    const checkerPassword = await bcrypt.compare(password, foundedUser.password)

    if(!checkerPassword) {
     throw BaseError.BadRequest("Invalid password")
    }

    if(foundedUser.verify === true) {
      const accessToken = generateAccessToken({id: foundedUser._id, role: foundedUser.role,
        email: foundedUser.email
      })

      const refreshToken = generateRefreshToken({id: foundedUser._id, email: foundedUser.email,
        role: foundedUser.role
      })

      res.cookie("accessToken", accessToken, {httpOnly: true, maxAge: process.env.COOKIE_ACCESS_TIME})
      res.cookie("refreshToken", refreshToken, {httpOnly: true, maxAge: process.env.COOKIE_REFRESH_TIME})

     return res.json({
        message: "Successfully",
        tokens: {
          accessToken
        }
      })
    }else{
      throw BaseError.BadRequest("You were not verfied")
    }
  }catch(error) {
    next(error)
  }
}


// const logOut = async (req, res, next) => {
//   try{
//     const {refreshToken} = req.cookies
//     res.clearCookie(refreshToken)
//   }catch(error) {
//     next(error)
//   }
// }

module.exports = {
  register,
  verify,
  login,
  // logOut
}