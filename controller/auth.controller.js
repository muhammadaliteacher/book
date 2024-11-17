const AuthSchema = require("../schemas/auth.schema")
const nodemailer = require("nodemailer")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

require("dotenv").config()

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body

    const foundedUser = await AuthSchema.findOne({ email: email })

    if (foundedUser) {
      res.json({
        message: "User already exists"
      })
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
        res.json({
          message: error.message
        })
      } else {
        res.json({
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
      res.json({
        message: "User not found"
      })
    }

    if (foundedUser.verify_code === verify_code_by_client) {
      await AuthSchema.findByIdAndUpdate(foundedUser._id, { verify: true })

      const token = jwt.sign({ email: foundedUser.email, role: foundedUser.role, id: foundedUser._id },
        process.env.SEKRET_KEY, { expiresIn: process.env.JWT_TIME })

      res.json({
        message: "Successfully verified",
        token
      })

    } else {
      res.json({
        message: "Verify code mistake or not exists"
      })
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
      res.json({
        message: "User not found"
      })
    }

    const checkerPassword = await bcrypt.compare(password, foundedUser.password)

    if(!checkerPassword) {
      res.json({
        message: "Invalid password"
      })
    }

    if(foundedUser.verify === true) {
      const token = jwt.sign({ email: foundedUser.email, role: foundedUser.role, id: foundedUser._id },
        process.env.SEKRET_KEY, { expiresIn: process.env.JWT_TIME })

      res.json({
        message: "Successfully",
        token
      })
    }else{
      res.json({
        message: "You were not verified"
      })
    }


  }catch(error) {
    next(error)
  }
}

module.exports = {
  register,
  verify,
  login
}