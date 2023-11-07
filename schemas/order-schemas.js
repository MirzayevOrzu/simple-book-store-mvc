const Joi = require("joi");

exports.createSchema = Joi.object({
    bookId: Joi.string().required(),
    client_name: Joi.string().trim().not().empty().required(),
    client_phone: Joi.number().min(998000000000).max(998999999999).required(),
    quantity: Joi.number().positive().min(1).required(),
    address: Joi.string().trim().not().empty().required(),
});
