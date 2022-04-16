const mongoose = require("mongoose");
const Item = require("../models/Item.js");

// Get the full list of items
exports.getItemList = async (req, res, next) => {
  try {
    const items = await Item.find({}).exec();
    res.render("itemCatalog", {
      title: "Catalog",
      items,
    });
  } catch (err) {
    return next(err);
  }
};

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

exports.getCreateItem = (req, res, next) => {
  res.render("itemForm", {
    title: "New Item",
  });
};
exports.postCreateItem = (req, res, next) => {};
