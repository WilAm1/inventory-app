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

// GET and POST for Deleting an Item
router.get("/item/:id/delete", itemController.getDeleteItem);
router.post("/item/:id/delete", itemController.postDeleteItem);

// GET and POST for Updating an Item
router.get("/item/:id/update", itemController.getUpdateItem);
router.post("/item/:id/update", itemController.postUpdateItem);

module.exports = router;
