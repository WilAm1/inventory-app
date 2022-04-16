const express = require("express");
const catalogController = require("../controllers/catalogController");

const router = express.Router();

// Items Routes

// GET all items
router.get("/", catalogController.getItemList);
// GET a single item
router.get("/item/:id", catalogController.getItemDetail);

// GET create form for single item
router.get("/create", catalogController.getCreateItem);
router.post("/create", catalogController.postCreateItem);

module.exports = router;
