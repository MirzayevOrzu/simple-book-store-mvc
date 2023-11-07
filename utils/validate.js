function makeValidator(schema) {
    return async function validator(req, res, next) {
        try {
            req.body = await schema.validateAsync(req.body);

            next();
        } catch (err) {
            req.flash("error", err.details[0].message);
            res.redirect(req.url);
        }
    };
}

module.exports = makeValidator;
