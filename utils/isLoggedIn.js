const isLoggedIn = (req, res, next) => {
    if (!req.adminId) {
        res.redirect("/");

        return;
    }

    next();
};

module.exports = isLoggedIn;
