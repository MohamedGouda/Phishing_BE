const express = require("express");
const router = express.Router();
const targetController = require("../Controllers/target.controller");

router.get("/target", targetController.getTargetsList);

router.get("/target/:targetId", targetController.getTargetById);

router.post("/target", targetController.addTarget);

module.exports = router;
