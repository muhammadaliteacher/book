const { Schema, model } = require("mongoose")

const Authors = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: Number,
    required: true,
    maxlength: 4,
    minlength: 2
  },
  date_of_death: {
    type: Number,
    required: true,
    maxlength: 4,
    minlength: 2
  },
  country: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true,
    max: 10000
  },
  works: {
    type: String,
    required: true,
    max: 10000
  },
  image: {
    type: String,
    required: true
  }
},
  {
    versionKey: false,
    timestamps: true
  }
)

module.exports = model("Authors", Authors)