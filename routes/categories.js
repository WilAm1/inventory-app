const express = require("express");
const categoryController = require("../controllers/categoryController");
const router = express.Router();

// GET all category in the db
router.get("/", categoryController.getCategoryList);
// GET a category detail
router.get("/category/:id", categoryController.getCategoryDetail);

// GET and POST  for creating category
router.get("/create", categoryController.getCreateCategory);
router.post("/create", categoryController.postCreateCategory);

// GET and POST for deleting a category
router.get("/category/:id/delete", categoryController.getDeleteCategory);
router.post("/category/:id/delete", categoryController.postDeleteCategory);

// GET and POST for updating a category
router.get("/category/:id/update", categoryController.getUpdateCategory);
router.post("/category/:id/update", categoryController.postUpdateCategory);

module.exports = router;
