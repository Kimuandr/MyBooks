const express = require("express");
const router = express.Router();
const userBookListController = require("../controllers/userBookList.controller");

router.post("/list", userBookListController.create);
router.get("/list", userBookListController.getBookList);

module.exports = router;
