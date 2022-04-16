const mongoose = require("mongoose");
const Item = require("../models/Item.js");
const Category = require("../models/Category");
const { isValidObjectId } = require("mongoose");
const { body, param, validationResult } = require("express-validator");

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
exports.getDeleteItem = [
  // ? Checks get param if id is valid mongoose ID
  param("id").custom((id) => {
    return isValidObjectId(id);
  }),
  async (req, res, next) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) throw new Error("404 Not found");
      const itemID = req.params.id;
      const item = await Item.findById(itemID).exec();
      return res.render("itemDelete", {
        title: "Delete Item",
        item,
      });
    } catch (error) {
      return next(error);
    }
  },
];

// POST delete item
exports.postDeleteItem = [
  body("itemID").custom((id) => isValidObjectId(id)),
  async (req, res, next) => {
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) throw new Error("404 Invalid ID CODE");
      const itemID = req.body.itemID;
      await Item.findByIdAndDelete(itemID);
      return res.redirect("/catalog");
    } catch (error) {
      return next(error);
    }
  },
];

// GET update item
exports.getUpdateItem = [
  param("id").custom((id) => isValidObjectId(id)),
  async (req, res, next) => {
    const errors = validationResult(req);
    const itemID = req.params.id;
    try {
      if (!errors.isEmpty()) throw new Error("404 Not Found");
      const item = await Item.findById(itemID).exec();
      const categories = await Category.find({ category: itemID }).exec();
      if (!item) throw new Error("404 Not Found");
      return res.render("itemForm", {
        title: "Update Item",
        item,
        categories,
      });
    } catch (error) {
      return next(error);
    }
  },
];

// POST update item
exports.postUpdateItem = [
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
    const itemID = req.params.id;
    if (!isValidObjectId(itemID)) return next(new Error("404 Not Found"));
    const errors = validationResult(req);
    const item = new Item({
      _id: itemID,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stockCode: req.body.stockCode,
    });
    try {
      const isItemExists = await Item.findById(itemID).exec();
      if (!isItemExists) throw new Error("404 Not Found");
      if (!errors.isEmpty()) {
        return res.render("itemDetail", {
          title: "Update Item",
          item,
        });
      }

      await Item.findByIdAndUpdate(itemID, item);
      return res.redirect("/catalog");
    } catch (error) {
      return next(error);
    }
  },
];
