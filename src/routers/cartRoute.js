import express from "express";
import cartController from "../controllers/cartController.js";
import tryCatchHandler from "../utils/tryCatchHandler.js";

const cartRouter = express.Router();

cartRouter.post(
  "/create-cart/:id",
  tryCatchHandler(cartController.createCartController)
);
cartRouter.get(
  "/view-cart/:id",
  tryCatchHandler(cartController.getCartController)
);
cartRouter.delete(
  "/delete-cart/:userId/:itemId",
  tryCatchHandler(cartController.deleteCartController)
);

export default cartRouter;
