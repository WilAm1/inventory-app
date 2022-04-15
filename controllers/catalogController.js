const Item = require("../models/Item.js");

// Get the full list of items
exports.getItemList = (req, res, next) => {
  // res.send("Get all Item List. Later!");

  Item.find({}).exec(function (err, items) {
    if (err) return next(err);
    res.render("catalog", {
      title: "Catalog",
      items,
    });
  });
};

exports.getItemDetail = (req, res, next) => {
  const itemID = req.params.id;
  res.send("Get Item Detail." + itemID);
};
