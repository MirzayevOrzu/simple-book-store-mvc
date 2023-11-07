const { Router } = require("express");
const isLoggedIn = require("../utils/isLoggedIn");
const makeValidator = require("../utils/validate");
const { createOrUpdateSchema } = require("../schemas/author-schemas");
const authorHandlers = require("../controllers/author-handlers");

const authorRoutes = Router();

authorRoutes.get("/authors", authorHandlers.list);
authorRoutes.get("/authors/create", isLoggedIn, authorHandlers.createPage);
authorRoutes.get("/authors/:id", authorHandlers.show);
authorRoutes.post(
    "/authors",
    isLoggedIn,
    makeValidator(createOrUpdateSchema),
    authorHandlers.create
);
authorRoutes.get("/authors/:id/edit", isLoggedIn, authorHandlers.updatePage);
authorRoutes.put(
    "/authors/:id",
    isLoggedIn,
    makeValidator(createOrUpdateSchema),
    authorHandlers.update
);
authorRoutes.delete("/authors/:id", isLoggedIn, authorHandlers.delete);

module.exports = authorRoutes;
