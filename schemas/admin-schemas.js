const Joi = require("joi");

exports.loginSchema = Joi.object({
    username: Joi.string().min(4).trim(),
    password: Joi.string().min(4).trim(),
});
