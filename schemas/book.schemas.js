const { Schema, model } = require("mongoose");

const booksSchema = new Schema({
  title: {
    type: String,
    required: [true, "title talab qilinadi"],
    match: [/^[A-Za-z0-9]+$/, "faqat raqamlar bilan harflarni qabul qiladi!"]
    // set: value => value.trim().toUpperCase()
    // default: "o'tkan kunlar"
  },
  author: {
    type: String,
    required: true,
    uppercase: true
    // lowercase: true
  },
  rate: {
    type: Number,
    default: 0,
  },
  page: {
    type: Number,
    required: true,
    // min: [10, "kamida 10 varoq bo'lsin!"],
    // max: [1000, "1000 dan kamroq sahifa kerak!"]
    validate: {
      validator: function (value) {
        return /\d{10}/.test(value)
      },
      message: "10 tadan kam raqam bo'lmasin!"
    }
  },
  publish: {
    type: String,
    required: true,
    minlength: [5, "22 ta harfdan ko'proq kriting!"],
    maxlength: [1000, "1000 ta harfdan oshmasin! pls..."]
  },
  genre: {
    type: String,
    required: true,
    enum: {
      values: ["fantastic", "dramma", "historical", "roman", "horror", "comedy", "detective", "fiction", "action"],
      message: "{VALUE} bunaqa janr mavjud emas!"
    }
  },
  publishHome: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  author_info: {
    type: Schema.Types.ObjectId,
    ref: "Authors",
    required: true,
  },
  image: {
    type: String,
    required: true
  },
  era: {
    type: String,
    required: true,
    enum: {
      values: ["Temuriylar davri", "Jadid davri", "Sovet davri", "Mustaqillik davri"],
      message: "{VALUE} bunaqa davr mavjud emas!"
    }
  }
},
  {
    versionKey: false,
    timestamps: true
  });

booksSchema.statics.findByTitle = function (title) {
  return this.find({ title })
}

const BooksScheams = model("Books", booksSchema);

module.exports = BooksScheams
