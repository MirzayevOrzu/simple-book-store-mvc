const adminsDb = require("../db/adminsDb");

exports.loginPage = (req, res) => {
    res.locals.title = "Admin Login | BOOK STORE";
    res.locals.page = "other";
    res.render("admins/login");
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const admin = await adminsDb.findByUsername(username);

    if (!admin) {
        req.flash("error", "Foydalanuvchi ismi yoki parol xato");
        res.redirect("/login");

        return;
    }

    if (admin.password !== password) {
        res.flash("error", "Foydalanuvchi ismi yoki parol xato");
        res.redirect("/login");

        return;
    }

    req.session.admin = { adminId: admin.id };

    res.redirect("/");
};

exports.logout = (req, res) => {
    req.session.destroy();

    res.redirect("/");
};

exports.profile = async (req, res) => {
    const admin = await adminsDb.findById(req.adminId);

    if (!admin) {
        res.redirect("/");
        return;
    }

    res.locals.title = "Profile | BOOK STORE";
    res.locals.page = "other";
    res.render("admins/profile", { admin });
};
