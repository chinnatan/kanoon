import dotenv from "dotenv";
dotenv.config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { logger } from "./src/utils/logger.util";

const app = express();

app.use(bodyParser.json());
app.use(cors());

import authRoute from "./src/routes/auth.route";
app.use("/auth", authRoute);

import productRoute from "./src/routes/product.route";
app.use("/product", productRoute);

import orderRoute from "./src/routes/order.route";
app.use("/order", orderRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  logger.info(`Server is running on port ${process.env.PORT}`);
});
