import express from "express";
import itemController from "../controllers/itemController.js";
import tryCatchHandler from "../utils/tryCatchHandler.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const itemRouter = express.Router();

itemRouter.post(
  "/create-item",
  upload.single("itemImage"),
  tryCatchHandler(itemController.createItemController)
);
itemRouter.get(
  "/get-items",
  tryCatchHandler(itemController.getItemsController)
);
itemRouter.put(
  "/update-item:id",
  tryCatchHandler(itemController.updateItemsController)
);
itemRouter.delete(
  "/delete-item:id",
  tryCatchHandler(itemController.deleteItemsController)
);

export default itemRouter;
