import { Item } from "../models/itemModel.js";
import { itemValidator } from "../validators/itemValidator.js";

//cloudinary
import cloudinary from "../utils/cloudinary.js";

const itemController = {
  createItemController: async (req, res) => {
    const { error } = itemValidator.validate(req.body);
    if (error) throw error;
    //new
    const itemUpload = await cloudinary.uploader.upload(req.file.path);

    const { title, description, category, price, countInStock } = req.body;
    const newItem = await Item.create({
      itemImage: itemUpload.secure_url,
      title: title,
      description: description,
      category: category,
      price: price,
      countInStock: countInStock,
    });
    newItem.save().then((item) => res.json(item));
  },
  getItemsController: async (req, res) => {
    Item.find()
      .sort({ date: -1 })
      .then((items) => res.json({ data: { items } }));
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
