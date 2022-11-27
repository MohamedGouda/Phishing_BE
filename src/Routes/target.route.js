const express = require("express");
const router = express.Router();
const targetController = require("../Controllers/target.controller");

router.post("/target", targetController.getTargetsList);

router.get("/target/:target_id", targetController.getTargetById);

router.put("/target/:target_id", targetController.editTarget);


router.post("/target", targetController.addTarget);

router.post("/target/bulk" , targetController.addBulkData)

router.post("/target/bulk/verify" , targetController.verifyBulkData)

router.post("/target/search" , targetController.searchTargets)

module.exports = router;
