import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import globalErrorHandler from "./src/utils/globalErrorHandler.js";
import config from "./src/config/index.js";
import authRouter from "./src/routers/authRoute.js";
import itemRouter from "./src/routers/itemRoute.js";
import cartRouter from "./src/routers/cartRoute.js";
import orderRouter from "./src/routers/orderRoute.js";

dotenv.config({ path: "./configenv.env" });

const mongoURI = config.MONGODB_CONNECTION_URL;

mongoose
  .connect(mongoURI)
  .then(console.log("Database connection is established"))
  .catch((err) => console.log(err.message));
const port = config.PORT;
const app = express();

app.use(
  cors({
    // origin: "http://localhost:3000",
    // origin: "*",
    // origin: "https://tech-marketplace-frontend-nu.vercel.app/",
    origin: "https://tech-marketplace-frontend-nu.vercel.app",
    // origin: "http://localhost:6000",
    // origin: "http://localhost:3001/",
    // credentials: true,
    // optionsSuccessStatus: 200,
  })
);
// Middleware
app.use(morgan("tiny"));
app.use(express.json());
// app.use(cors());

// Routes
app.use("/auth", authRouter);
app.use("/item", itemRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);

// error handler
app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
