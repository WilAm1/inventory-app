const express = require("express");
const categoryController = require("../controllers/categoryController");
const router = express.Router();

// GET all category in the db
router.get("/", categoryController.getCategoryList);
router.get("/category/:id", categoryController.getCategoryDetail);

// GET form for creating category
router.get("/create", categoryController.getCreateCategory);
// POST form
router.post("/create", categoryController.postCreateCategory);

module.exports = router;
