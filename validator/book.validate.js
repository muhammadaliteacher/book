const Joi = require("joi");

exports.bookValidator = function (data) {
  try {
    const schema = Joi.object({
      title: Joi.string().min(3).max(50).required(),
      author: Joi.string().min(3).max(30).required(),
      rate: Joi.number(), 
      page: Joi.number(),
      publish: Joi.string(),
      genre: Joi.string(),
      publishHome: Joi.string().min(5).max(50),
      description: Joi.string().min(5).max(10000),
      author_info: Joi.string(),
      image: Joi.string(),
      era: Joi.string()
    });

    return schema.validate(data);
  } catch (error) {
    throw new Error(error.message);
  }
};