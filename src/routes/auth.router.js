const express = require("express");
const AuthController = require("../controllers/auth.controller");

const router = express.Router();
const auth = new AuthController();

router.post("/register", auth.register);
router.post("/login", auth.login);
router.post("/logout", auth.logout.bind(auth));

module.exports = router;
