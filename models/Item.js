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
    max: 100000,
    required: true,
  },
  stock: {
    type: Number,
    max: 100,
    required: true,
  },
});

ItemSchema.virtual("url").get(function () {
  return "/catalog/" + this._id;
});

module.exports = mongoose.model("Item", ItemSchema);
