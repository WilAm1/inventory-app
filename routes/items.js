const express = require("express");
const itemController = require("../controllers/itemController");

const router = express.Router();

// Items Routes

// GET all items
router.get("/", itemController.getItemList);
// GET a single item
router.get("/item/:id", itemController.getItemDetail);

// GET create form for single item
router.get("/create", itemController.getCreateItem);
router.post("/create", itemController.postCreateItem);

module.exports = router;
