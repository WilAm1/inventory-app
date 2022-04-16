const mongoose = require("mongoose");
const Item = require("../models/Item.js");
const Category = require("../models/Category");

const { body, validationResult } = require("express-validator");

// GET all items
exports.getItemList = async (req, res, next) => {
  try {
    const items = await Item.find({}).exec();
    res.render("itemList", {
      title: "Catalog",
      items,
    });
  } catch (err) {
    return next(err);
  }
};
// GET item detail
exports.getItemDetail = async (req, res, next) => {
  const itemID = req.params.id;
  try {
    if (!mongoose.isValidObjectId(itemID)) {
      const errMsg = new Error("Item not Found");
      errMsg.status = 404;
      throw errMsg;
    }
    const item = await Item.findById(itemID).populate("category").exec();
    if (!item) {
      const errMsg = new Error("Item not found.");
      errMsg.status = 404;
      return next(errMsg);
    }
    return res.render("itemDetail", {
      title: "Item Detail",
      item,
    });
  } catch (err) {
    return next(err);
  }
};
// GET create item form
exports.getCreateItem = async (req, res, next) => {
  try {
    const categories = await Category.find({}).exec();
    res.render("itemForm", {
      title: "New Item",
      categories,
    });
  } catch (err) {
    return next(err);
  }
};
// POST create item form
exports.postCreateItem = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Invalid Name")
    .isAlphanumeric()
    .withMessage("Name must only use alphanumeric characters"),
  body("description")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage(" Description Must not be empty"),
  body("price", "Use numeric characters only").trim().isNumeric().escape(),
  body("stockCode")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Stock Code must not be empty"),
  body("category").trim().escape(),

  async (req, res, next) => {
    const errors = validationResult(req);
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stockCode: req.body.stockCode,
      category: req.body.category,
    });
    try {
      if (!errors.isEmpty()) {
        const categories = await Category.find({}).exec();
        res.render("itemForm", {
          title: "Create Item (Err)",
          errors: errors.array(),
          categories,
        });
      }
      await item.save();
      return res.redirect(item.url);
    } catch (err) {
      return next(err);
    }
  },
];

// GET delete item
exports.getDeleteItem = async (req, res, next) => {
  res.send("GET delete item");
};
// POST delete item
exports.postDeleteItem = async (req, res, next) => {
  res.send("POST delete item");
};
// GET update item
exports.getUpdateItem = async (req, res, next) => {
  res.send("GET Update item");
};
// POST update item
exports.postUpdateItem = async (req, res, next) => {
  res.send("Post update item");
};
