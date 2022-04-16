const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    maxlength: 200,
    minlength: 3,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

CategorySchema.virtual("url").get(function () {
  return "/categories/" + this._id;
});

module.exports = mongoose.model("Category", CategorySchema);
