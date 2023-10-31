import mongoose from "mongoose";
// const { isEmail } = require("validator");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  itemImage: {
    type: String,
    required: [true, "Please upload your product image"],
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  date_added: {
    type: Date,
    default: Date.now,
  },
});

const Item = mongoose.model("Item", ItemSchema);

export { Item };
