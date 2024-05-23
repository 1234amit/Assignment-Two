// import express, { Application, Request, Response } from "express";
// import cors from "cors";
// import { productRoute } from "./app/modules/product/product.route";
// import { orderRoute } from "./app/modules/order/order.route";

// const app: Application = express();

import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { productRoute } from "./app/modules/product/product.route";
import { orderRoute } from "./app/modules/order/order.route";

const app: Application = express();

const corsConfig = {
  origin: "*", // Allow requests from all origins, you can specify specific origins if needed
  credentials: true, // Allow credentials like cookies, authorization headers, etc.
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specified HTTP methods
};

app.use(express.json());
app.use(cors(corsConfig));

// Preflight request handling for CORS
app.options("*", cors(corsConfig));

// Call the product and order route
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to my Ecommerce server.");
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: err.message,
  });
});

export default app;
