const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    maxlength: 200,
    minlength: 4,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    max: 100000,
    required: true,
  },
  stockCode: {
    type: String,
    maxlength: 100,
    required: true,
  },
});

ItemSchema.virtual("url").get(function () {
  return "/catalog/item/" + this._id;
});

module.exports = mongoose.model("Item", ItemSchema);
