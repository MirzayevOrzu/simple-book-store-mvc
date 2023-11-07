const categoriesDb = require("../db/categoriesDb");
const booksDb = require("../db/booksDb");

exports.list = async (req, res) => {
    const categories = await categoriesDb.findAll();

    res.locals.title = "Turkumlar | BOOK STORE";
    res.locals.page = "categories";
    res.render("categories/list", {
        categories,
    });
};

exports.show = async (req, res) => {
    const { id } = req.params;
    const category = await categoriesDb.findById(id);

    if (!category) {
        req.flash("error", "Turkum mavjud emas.");
        res.redirect("/categories");

        return;
    }

    const categoryBooks = await booksDb.findAllByCategory(id);

    res.locals.title = `${category.name} | BOOK STORE`;
    res.locals.page = "categories";
    res.render("categories/show", {
        category,
        categoryBooks,
    });
};

exports.createPage = async (req, res) => {
    res.locals.title = "Turkum qo'shish | BOOK STORE";
    res.locals.page = "categories";
    res.render("categories/create");
};

exports.create = async (req, res) => {
    await categoriesDb.insert(req.body);

    req.flash("success", "Turkum muvaffaqiyatli qo'shildi.");
    res.redirect("/categories");
};

exports.updatePage = async (req, res) => {
    const { id } = req.params;

    const category = await categoriesDb.findById(id);

    if (!category) {
        req.flash("error", "Turkum topilmadi.");
        res.redirect("/categories");

        return;
    }

    res.locals.title = "Turkum qo'shish | BOOK STORE";
    res.locals.page = "categories";
    res.render("categories/update", { category });
};

exports.update = async (req, res) => {
    const { id } = req.params;

    const category = await categoriesDb.findById(id);

    if (!category) {
        req.flash("error", "Turkum topilmadi.");
        res.redirect("/categories");

        return;
    }

    await categoriesDb.update(id, req.body);

    req.flash("success", "Turkum muvaffaqiyatli tahrirlandi.");
    res.redirect(`/categories/${id}`);
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    const category = await categoriesDb.findById(id);

    if (!category) {
        req.flash("error", "Turkum topilmadi.");
        res.redirect("/categories");

        return;
    }

    await categoriesDb.remove(id);

    req.flash("success", "Turkum muvaffaqiyatli o'chirildi");
    res.redirect("/categories");
};
