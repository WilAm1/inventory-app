import mongoose from "mongoose";

const { Schema } = mongoose;

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
  return "/category/" + this._id;
});

export default mongoose.model("Item", CategorySchema);
