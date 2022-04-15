const express = require("express");
const categoryController = require("../controllers/categoryController");
const router = express.Router();

// GET all category in the db
router.get("/", categoryController.getCategoryList);

module.exports = router;
