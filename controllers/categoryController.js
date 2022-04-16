const Item = require("../models/Item");
const Category = require("../models/Category");
const async = require("async");
const mongoose = require("mongoose");

// ? Controllers for category view and routes

exports.getCategoryList = async (req, res, next) => {
  try {
    const categoryList = await Category.find({}).exec();
    console.log(categoryList);
    res.render("categoryList", {
      title: "Category List",
      categoryList,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getCategoryDetail = async (req, res, next) => {
  const categoryID = req.params.id;

  try {
    if (!mongoose.isValidObjectId(categoryID)) {
      const errMsg = new Error("Item not Found");
      errMsg.status = 404;
      throw errMsg;
    }

    const { category, items } = await async.parallel({
      category: function (cb) {
        Category.findById(categoryID).exec(cb);
      },
      items: function (cb) {
        Item.find({ category: categoryID }).exec(cb);
      },
    });
    console.log("i ran?");
    if (!category) {
      const errMsg = new Error("Item not found.");
      errMsg.status = 404;
      return next(errMsg);
    }
    return res.render("categoryDetail", {
      title: category.name,
      category,
      items,
    });
  } catch (err) {
    return next(err);
  }
};

// For form
exports.getCreateCategory = (req, res, next) => {
  res.render("categoryForm", {
    title: "Create new Catalog",
  });
};

exports.postCreateCategory = () => {};
