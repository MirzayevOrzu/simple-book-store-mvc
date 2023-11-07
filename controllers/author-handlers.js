const booksDb = require("../db/booksDb");
const authorsDb = require("../db/authorsDb");

exports.list = async (req, res) => {
    const authors = await authorsDb.findAll();

    res.locals.title = "Mualliflar | BOOK STORE";
    res.locals.page = "authors";
    res.render("authors/list", {
        authors,
    });
};

exports.show = async (req, res) => {
    const author = await authorsDb.findById(req.params.id);

    if (!author) {
        res.flash("error", "Muallif mavjud emas.");
        res.redirect("/authors");

        return;
    }

    const authorBooks = await booksDb.findAllByAuthor(author.id);

    res.locals.title = `${author.name} | BOOK STORE`;
    res.locals.page = "authors";
    res.render("authors/show", {
        author,
        authorBooks,
    });
};

exports.createPage = async (req, res) => {
    res.locals.title = "Muallif qo'shish | BOOK STORE";
    res.locals.page = "authors";
    res.render("authors/create");
};

exports.create = async (req, res) => {
    await authorsDb.insert(req.body);

    res.redirect("/authors");
};

exports.updatePage = async (req, res) => {
    const { id } = req.params;

    const author = await authorsDb.findById(id);

    if (!author) {
        req.flash("error", "Muallif topilmadi.");
        res.redirect("/authors");

        return;
    }

    res.locals.title = "Muallif qo'shish | BOOK STORE";
    res.locals.page = "authors";
    res.render("authors/update", { author });
};

exports.update = async (req, res) => {
    const { id } = req.params;

    const author = await authorsDb.findById(id);

    if (!author) {
        req.flash("error", "Muallif topilmadi.");
        res.redirect("/authors");

        return;
    }

    await authorsDb.update(id, req.body);

    req.flash("success", "Muallif muvaffaqiyatli tahrirlandi.");
    res.redirect(`/authors/${id}`);
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    const author = await authorsDb.findById(id);

    if (!author) {
        req.flash("error", "Muallif topilmadi.");
        res.redirect("/authors");

        return;
    }

    await authorsDb.remove(id);

    req.flash("success", "Muallif muvaffaqiyatli o'chirildi");
    res.redirect("/authors");
};
