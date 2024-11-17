const {Schema, model} = require("mongoose")

const AuthSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user",
    enum: {
      values: ["user", "admin", 'superAdmin'],
      message: "${VALUE} role yo'q"
    }
  },
  verfy_code: {
    type: String,
  },
  verify: {
    type: Boolean,
    default: false
  },
},
{
  versionKey: false,
  timestamps: true
})

module.exports = model("Auth", AuthSchema)