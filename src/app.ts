import express, { Application, Request, Response } from "express";
import cors from "cors";
import { productRoute } from "./app/modules/product/product.route";
import { orderRoute } from "./app/modules/order/order.route";

const app: Application = express();

const corsConfig = {
  origin: "*",
  credential: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(express.json());
app.options("", cors(corsConfig));
app.use(cors(corsConfig));

app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to my Ecommerce server.");
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  res.status(500).send({
    status: "error",
    message: err.message,
  });
});

export default app;
