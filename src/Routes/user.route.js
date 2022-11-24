const express = require("express");
const router = express.Router();
const userController = require("../Controllers/user.controller");

router.post("/users", userController.getUsersList);

router.get("/user/:user_id", userController.getUserById);

router.post("/user", userController.addUser);

router.post("/user/search", userController.searchUser);


module.exports = router;
