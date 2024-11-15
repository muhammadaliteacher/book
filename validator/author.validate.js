const Joi = require("joi");

exports.authorValidator = function (data) {
  try {
    const schema = Joi.object({
      first_name: Joi.string().min(3).max(30).required(),
      last_name: Joi.string().min(3).max(30).required(),
      date_of_birth: Joi.date(), 
      date_of_death: Joi.date(),
      country: Joi.string().min(2).max(150),
      bio: Joi.string().min(10).max(10000),
      works: Joi.string().min(10).max(10000),
      image: Joi.string()
    });

    return schema.validate(data);
  } catch (error) {
    throw new Error(error.message);
  }
};