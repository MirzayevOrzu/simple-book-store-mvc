const { Router } = require("express");
const isLoggedIn = require("../utils/isLoggedIn");
const makeValidator = require("../utils/validate");
const { createOrUpdateSchema } = require("../schemas/category-schemas");
const categoryHandlers = require("../controllers/category-handlers");

const authorRoutes = Router();

authorRoutes.get("/categories", isLoggedIn, categoryHandlers.list);
authorRoutes.get("/categories/create", isLoggedIn, categoryHandlers.createPage);
authorRoutes.get("/categories/:id", isLoggedIn, categoryHandlers.show);
authorRoutes.post(
    "/categories",
    isLoggedIn,
    makeValidator(createOrUpdateSchema),
    categoryHandlers.create
);
authorRoutes.get(
    "/categories/:id/edit",
    isLoggedIn,
    categoryHandlers.updatePage
);
authorRoutes.put(
    "/categories/:id",
    isLoggedIn,
    makeValidator(createOrUpdateSchema),
    categoryHandlers.update
);
authorRoutes.delete("/categories/:id", isLoggedIn, categoryHandlers.delete);

module.exports = authorRoutes;
