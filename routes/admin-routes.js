const { Router } = require("express");
const isLoggedIn = require("../utils/isLoggedIn");
const makeValidator = require("../utils/validate");
const { loginSchema } = require("../schemas/admin-schemas");
const adminHandlers = require("../controllers/admin-handlers");

const adminRoutes = Router();

adminRoutes.get("/login", adminHandlers.loginPage);
adminRoutes.post("/login", makeValidator(loginSchema), adminHandlers.login);
adminRoutes.get("/logout", adminHandlers.logout);
adminRoutes.get("/profile", isLoggedIn, adminHandlers.profile);

module.exports = adminRoutes;
