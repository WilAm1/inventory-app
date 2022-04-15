const Item = require("../models/Item.js");

// Get the full list of items
exports.getItemList = (req, res, next) => {
  Item.find({}).exec(function (err, items) {
    if (err) return next(err);
    res.render("itemCatalog", {
      title: "Catalog",
      items,
    });
  });
};

exports.getItemDetail = (req, res, next) => {
  const itemID = req.params.id;

  Item.findById(itemID)
    .populate("category")
    .exec(function (err, item) {
      if (err) return next(err);

      if (!item) {
        const errMsg = new Error("Item not found.");
        errMsg = 404;
        return next(errMsg);
      }

      res.render("itemDetail", {
        title: "Item Detail",
        item,
      });
    });
};
