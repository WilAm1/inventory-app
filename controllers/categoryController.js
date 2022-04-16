const Item = require("../models/Item");
const Category = require("../models/Category");
const async = require("async");
const { isValidObjectId } = require("mongoose");

const { body, param, validationResult } = require("express-validator");

// ? Controllers for category view and routes

// GET all category
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

// GET category detail
exports.getCategoryDetail = async (req, res, next) => {
  const categoryID = req.params.id;

  try {
    if (!isValidObjectId(categoryID)) {
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

// GET form for creating new category
exports.getCreateCategory = (req, res, next) => {
  res.render("categoryForm", {
    title: "Create new Catalog",
  });
};
// POST form for creating new categeory
exports.postCreateCategory = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Name must not be empty.")
    .isAlphanumeric()
    .withMessage("Name must only be with Alpha Numeric Characters"),
  body("description")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Description must not be empty."),

  async (req, res, next) => {
    const errors = validationResult(req);
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
    });
    try {
      if (!errors.isEmpty()) {
        return res.render("categoryForm", {
          title: "Create Category (Error)",
          errors: errors.array(),
          category,
        });
      }
      await category.save();
      return res.redirect(category.url);
    } catch (error) {
      return next(error);
    }
  },
];

// GET delete page
exports.getDeleteCategory = [
  param("id").custom((id) => isValidObjectId(id)),
  async (req, res, next) => {
    const categoryID = req.params.id;
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) throw new Error("404 Not Found");
      const category = await Category.findById(categoryID).exec();
      const items = await Item.find({ category: categoryID }).exec();
      if (items.length > 0) {
        return res.render("categoryDelete", {
          title: "Category Delete (delete items first)",
          category,
          items,
        });
      }
      return res.render("categoryDelete", {
        title: "Category Delete",
        category,
      });
    } catch (error) {
      return next(error);
    }
  },
];

// POST delete page
exports.postDeleteCategory = [
  body("categoryID").custom((id) => isValidObjectId(id)),
  async (req, res, next) => {
    const categoryID = req.body.categoryID;
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) throw new Error("404 No Page Found");
      const category = await Category.findById(categoryID).exec();
      const items = await Item.find({ category: categoryID }).exec();
      if (items.length > 0) {
        return res.render("categoryDelete", {
          title: "Category Delete (delete items first)",
          category,
          items,
        });
      }
      await Category.findByIdAndDelete(categoryID).exec();
      res.redirect("/categories");
    } catch (error) {
      return next(error);
    }
  },
];

// GET update page
exports.getUpdateCategory = [
  param("id").custom((id) => isValidObjectId(id)),
  async (req, res, next) => {
    const categoryId = req.params.id;
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) throw new Error("404");
      const category = await Category.findById(categoryId).exec();
      if (!category) throw new Error("404");
      res.render("categoryForm", {
        title: " Update " + category.name,
        category,
      });
    } catch (error) {
      return next(error);
    }
  },
];

// POST update page
exports.postUpdateCategory = async (req, res, next) => {
  res.send("Post update page");
};
