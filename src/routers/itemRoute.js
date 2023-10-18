import express from "express";
import itemController from "../controllers/itemController.js";
import tryCatchHandler from "../utils/tryCatchHandler.js";

const itemRouter = express.Router();

itemRouter.post(
  "/create-item",
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
