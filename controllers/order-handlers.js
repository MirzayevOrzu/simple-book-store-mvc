const booksDb = require("../db/booksDb");
const ordersDb = require("../db/ordersDb");

exports.add = async (req, res) => {
    const { quantity, bookId } = req.body;

    const book = await booksDb.findById(bookId);

    if (!book) {
        req.flash("error", "Kitob topilmadi");
        res.redirect("/");

        return;
    }

    await ordersDb.insert({ ...req.body, totalPrice: quantity * book.price });

    req.flash("success", "Buyurtmangiz muvaffaqiyatli jo'natildi.");

    res.redirect("/");
};

exports.list = async (req, res) => {
    const { status } = req.query;
    let orders = await ordersDb.findAll();
    const books = await booksDb.findAll();

    if (status) {
        orders = orders.filter((order) => order.status === status);
    }

    orders = orders.map((order) => {
        const book = books.find((book) => book.id === order.bookId);

        return { ...order, book };
    });

    res.locals.title = "Buyurtmalar | BOOK STORE";
    res.locals.page = "orders";
    res.render("orders/list", { orders, status: status || "all" });
};

exports.accept = async (req, res) => {
    const { id } = req.params;
    const order = await ordersDb.findById(id);

    if (!order) {
        req.flash("error", "Buyurtma topilmadi.");
        res.redirect("/orders");

        return;
    }

    const alloweStatuses = ["new", "cancelled"];

    if (!alloweStatuses.includes(order.status)) {
        req.flash(
            "error",
            "Faqat yangi va rad etilgan buyurtmalarni qabul qilish mumkin."
        );
        res.redirect("/orders");

        return;
    }

    order.status = "accepted";

    await ordersDb.update(id, order);

    res.redirect("/orders");
};

exports.send = async (req, res) => {
    const { id } = req.params;
    const order = await ordersDb.findById(id);

    if (!order) {
        req.flash("error", "Buyurtma topilmadi.");
        res.redirect("/orders");

        return;
    }

    if (order.status !== "accepted") {
        req.flash("error", "Faqat qabul qilingan buyurtmani jo'natish mumkin.");
        res.redirect("/orders");

        return;
    }

    order.status = "on_way";

    await ordersDb.update(id, order);

    res.redirect("/orders");
};

exports.complete = async (req, res) => {
    const { id } = req.params;
    const order = await ordersDb.findById(id);

    if (!order) {
        req.flash("error", "Buyurtma topilmadi.");
        res.redirect("/orders");

        return;
    }

    const book = await booksDb.findById(order.bookId);

    if (!book) {
        req.flash("error", "Buyurtma qilingan kitob topilmadi.");
        res.redirect("/orders");

        return;
    }

    if (order.status !== "on_way") {
        req.flash("error", "Faqat yo'ldagi buyurtmani yakunlash mumkin.");
        res.redirect("/orders");

        return;
    }

    order.status = "completed";

    await ordersDb.update(id, order);
    await booksDb.update(book.id, { copies: book.copies - 1 });

    res.redirect("/orders");
};

exports.cancel = async (req, res) => {
    const { id } = req.params;
    const order = await ordersDb.findById(id);

    if (!order) {
        req.flash("error", "Buyurtma topilmadi.");
        res.redirect("/orders");

        return;
    }

    if (order.status === "completed") {
        req.flash("error", "Yakunlangan buyurtmani rad eta olmaysiz.");
        res.redirect("/orders");

        return;
    }

    order.status = "cancelled";

    await ordersDb.update(id, order);

    res.redirect("/orders");
};
