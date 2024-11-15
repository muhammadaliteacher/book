const {
  authorValidator,
} = require("../validator/author.validate");

module.exports.authorValidate = function (req, res, next) {
  try {
    const { error } = authorValidator(req.body);
    if (error) {
      return res.status(400).json({ msg: error.details[0].message });
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};