const express = require("express");
const ViewsController = require("../controllers/views.controller");

const router = express.Router();
const views = new ViewsController();

router.get("/home", views.home);
router.get("/", views.login);
router.get("/signup", views.register);

module.exports = router;
