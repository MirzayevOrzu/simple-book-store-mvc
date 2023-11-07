const Joi = require("joi");

exports.createOrUpdateSchema = Joi.object({
    name: Joi.string().trim().min(4),
});
