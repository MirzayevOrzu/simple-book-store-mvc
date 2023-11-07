const Joi = require("joi");

exports.createOrUpdateSchema = Joi.object({
    title: Joi.string().trim().not().empty().required(),
    description: Joi.string().trim().not().empty().required(),
    copies: Joi.number().integer().positive().required(),
    cover: Joi.string().valid("hard", "soft").required(),
    price: Joi.number().positive().required(),
    authorId: Joi.string().required(),
    categoryId: Joi.string().required(),
});
