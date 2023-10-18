import { Item } from "../models/itemModel.js";
import { itemValidator } from "../validators/itemValidator.js";

const itemController = {
  createItemController: async (req, res) => {
    const { error } = itemValidator.validate(req.body);
    if (error) throw error;
    const { title, description, category, price } = req.body;
    const newItem = await Item.create({
      title: title,
      description: description,
      category: category,
      price: price,
    });
    newItem.save().then((item) => res.json(item));
  },
  getItemsController: async (req, res) => {
    Item.find()
      .sort({ date: -1 })
      .then((items) => res.json(items));
  },
  updateItemsController: async (req, res) => {
    Item.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function (
      item
    ) {
      Item.findOne({ _id: req.params.id }).then(function (item) {
        res.json(item);
      });
    });
  },
  deleteItemsController: async (req, res) => {
    Item.findByIdAndDelete({ _id: req.params.id }).then(function (item) {
      res.json({ success: true });
    });
  },
};

export default itemController;
