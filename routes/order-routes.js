const { Router } = require("express");
const isLoggedIn = require("../utils/isLoggedIn");
const makeValidator = require("../utils/validate");
const { createSchema } = require("../schemas/order-schemas");
const orderHandlers = require("../controllers/order-handlers");

const orderRoutes = Router();

orderRoutes.post("/orders", makeValidator(createSchema), orderHandlers.add);
orderRoutes.get("/orders", isLoggedIn, orderHandlers.list);
orderRoutes.post("/accept/:id", isLoggedIn, orderHandlers.accept);
orderRoutes.post("/send/:id", isLoggedIn, orderHandlers.send);
orderRoutes.post("/complete/:id", isLoggedIn, orderHandlers.complete);
orderRoutes.post("/cancel/:id", isLoggedIn, orderHandlers.cancel);

module.exports = orderRoutes;
