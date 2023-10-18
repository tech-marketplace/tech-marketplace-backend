import express from "express";
import orderController from "../controllers/orderController.js";
import tryCatchHandler from "../utils/tryCatchHandler.js";

const orderRouter = express.Router();

orderRouter.get(
  "/view-order/:id",
  tryCatchHandler(orderController.getOrderController)
);

orderRouter.post(
  "/checkout/:id",
  tryCatchHandler(orderController.checkoutController)
);
export default orderRouter;
