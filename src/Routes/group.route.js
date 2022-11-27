const express = require("express");
const router = express.Router();
const groupController = require("../Controllers/group.controller");

router.post("/groups", groupController.getGroupsList);

router.get("/group/:group_id", groupController.getGroupById);

router.post("/group", groupController.addGroup);

router.put("/group/:group_id" , groupController.editGroup)

router.post("/group/search" , groupController.searchGroups)

module.exports = router;
