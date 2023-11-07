const { Router } = require("express");
const isLoggedIn = require("../utils/isLoggedIn");
const makeValidator = require("../utils/validate");
const upload = require("../utils/upload");
const { createOrUpdateSchema } = require("../schemas/book-schemas");
const bookHandlers = require("../controllers/book-handlers");

const bookRoutes = Router();

bookRoutes.get("/", bookHandlers.list);
bookRoutes.get("/product/:id", bookHandlers.show);
bookRoutes.get("/books/create", isLoggedIn, bookHandlers.createPage);
bookRoutes.post(
    "/books",
    isLoggedIn,
    upload.single("image"),
    makeValidator(createOrUpdateSchema),
    bookHandlers.create
);
bookRoutes.get("/books/:id/edit", isLoggedIn, bookHandlers.updatePage);
bookRoutes.put(
    "/books/:id",
    isLoggedIn,
    upload.single("image"),
    makeValidator(createOrUpdateSchema),
    bookHandlers.update
);
bookRoutes.delete("/books/:id", isLoggedIn, bookHandlers.delete);

module.exports = bookRoutes;
