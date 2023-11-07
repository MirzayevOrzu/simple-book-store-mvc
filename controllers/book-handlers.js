const booksDb = require("../db/booksDb");
const authorsDb = require("../db/authorsDb");
const categoriesDb = require("../db/categoriesDb");

exports.list = async (req, res) => {
    const { category, author } = req.query;
    let books = await booksDb.findAll();
    const categories = await categoriesDb.findAll();
    const authors = await authorsDb.findAll();

    if (category) {
        books = books.filter((book) => book.categoryId === category);
    }

    if (author) {
        books = books.filter((book) => book.authorId === author);
    }

    res.locals.title = "Kitoblar | BOOK STORE";
    res.locals.page = "main";
    res.render("books/list", {
        books,
        categories,
        authors,
        category: category || "all",
        author: author || "all",
    });
};

exports.show = async (req, res) => {
    const book = await booksDb.findById(req.params.id);

    if (!book) {
        req.flash("error", "Kitob topilmadi.");
        res.redirect("/");
        return;
    }

    const author = await authorsDb.findById(book.authorId);

    if (!author) {
        req.flash("error", "Muallif mavjud emas");
        res.redirect("/");

        return;
    }

    const category = await categoriesDb.findById(book.categoryId);

    if (!category) {
        req.flash("error", "Turkum mavjud emas");
        res.redirect("/");

        return;
    }

    res.locals.title = `${book.title} | BOOK STORE`;
    res.locals.page = "main";
    res.render("books/show", {
        book,
        author,
        category,
    });
};

exports.createPage = async (req, res) => {
    const authors = await authorsDb.findAll();
    const categories = await categoriesDb.findAll();

    res.locals.title = "Kitob qo'shish | BOOK STORE";
    res.locals.page = "main";
    res.render("books/create", { authors, categories });
};

exports.create = async (req, res) => {
    const { authorId, categoryId } = req.body;

    const author = await authorsDb.findById(authorId);

    if (!author) {
        req.flash("error", "Muallif topilmadi.");
        res.redirect("/books/create");

        return;
    }

    const category = await categoriesDb.findById(categoryId);

    if (!category) {
        req.flash("error", "Turkum topilmadi.");
        res.redirect("/books/create");

        return;
    }

    await booksDb.insert({
        ...req.body,
        image: req.file.filename || "default-image.png",
    });

    res.redirect("/");
};

exports.updatePage = async (req, res) => {
    const { id } = req.params;

    const book = await booksDb.findById(id);

    if (!book) {
        req.flash("error", "Kitob topilmadi.");
        res.redirect("/");

        return;
    }

    const authors = await authorsDb.findAll();
    const categories = await categoriesDb.findAll();

    res.locals.title = "Kitob tahrirlash | BOOK STORE";
    res.locals.page = "main";
    res.render("books/update", { book, authors, categories });
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { authorId, categoryId } = req.body;

    const book = await booksDb.findById(id);

    if (!book) {
        req.flash("error", "Kitob topilmadi.");
        res.redirect(`/books/${id}/edit`);

        return;
    }

    if (book.authorId !== authorId) {
        const author = await authorsDb.findById(authorId);

        if (!author) {
            req.flash("error", "Muallif topilmadi.");
            res.redirect(`/books/${id}/edit`);

            return;
        }
    }

    if (book.categoryId !== categoryId) {
        const category = await categoriesDb.findById(categoryId);

        if (!category) {
            req.flash("error", "Turkum topilmadi.");
            res.redirect("/");

            return;
        }
    }

    if (req.file) {
        req.body.image = req.file.filename;
    }

    await booksDb.update(id, req.body);

    req.flash("success", "Kitob muvaffaqiyatli tahrirlandi.");
    res.redirect(`/product/${id}`);
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    const book = await booksDb.findById(id);

    if (!book) {
        req.flash("error", "Kitob topilmadi.");
        res.redirect("/");

        return;
    }

    await booksDb.remove(id);

    req.flash("success", "Kitob muvaffaqiyatli o'chirildi");
    res.redirect("/");
};
