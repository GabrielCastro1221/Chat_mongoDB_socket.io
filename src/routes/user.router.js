const express = require("express");
const UserController = require("../controllers/user.controller");

const router = express.Router();
const user = new UserController();

router.get("/", user.getUsers);
router.get("/:uid", user.getUser);
router.put("/:uid", user.updateUser);
router.delete("/:uid", user.deleteUser);

module.exports = router;
