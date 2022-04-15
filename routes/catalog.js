const express = require("express");
const catalogController = require("../controllers/catalogController");

const router = express.Router();

// Catalog Routes

// GET all items
router.get("/", catalogController.getItemList);

module.exports = router;
