const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const bookRoutes = require("./routes/book-routes");
const authorRoutes = require("./routes/author-routes");
const adminRoutes = require("./routes/admin-routes");
const orderRoutes = require("./routes/order-routes");
const categoryRoutes = require("./routes/category-routes");

const app = express();

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads/", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
    session({
        name: "hello",
        secret: "hey",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60 * 60 * 1000 },
    })
);
app.use(flash());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use((req, res, next) => {
    res.locals.adminId = req.session.admin?.adminId || "";

    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");

    req.adminId = req.session.admin?.adminId || null;

    next();
});

app.use(bookRoutes);
app.use(authorRoutes);
app.use(adminRoutes);
app.use(orderRoutes);
app.use(categoryRoutes);

app.use((req, res) => {
    res.locals.page = "other";
    res.locals.title = "Sahifa Topilmadi | BOOK STORE";
    res.render("shared/error", {
        message: "Sahifa mavjud emas",
    });
});

app.listen(3000, () => {
    console.log("Server 3000-portda ishlayapti.");
});
