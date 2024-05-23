"use strict";
// import express, { Application, Request, Response } from "express";
// import cors from "cors";
// import { productRoute } from "./app/modules/product/product.route";
// import { orderRoute } from "./app/modules/order/order.route";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app: Application = express();
// const corsConfig = {
//   origin: "*",
//   credential: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
// };
// app.use(express.json());
// app.options("", cors(corsConfig));
// app.use(cors(corsConfig));
// // call the product and order route
// app.use("/api/products", productRoute);
// app.use("/api/orders", orderRoute);
// app.get("/", (req: Request, res: Response) => {
//   res.send("Welcome to my Ecommerce server.");
// });
// // Error handling middleware
// app.use((err: Error, req: Request, res: Response) => {
//   console.error(err.stack);
//   res.status(500).send({
//     status: "error",
//     message: err.message,
//   });
// });
// export default app;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/modules/product/product.route");
const order_route_1 = require("./app/modules/order/order.route");
const app = (0, express_1.default)();
const corsConfig = {
    origin: "*", // Allow requests from all origins, you can specify specific origins if needed
    credentials: true, // Allow credentials like cookies, authorization headers, etc.
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specified HTTP methods
};
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsConfig));
// Preflight request handling for CORS
app.options("*", (0, cors_1.default)(corsConfig));
// Call the product and order route
app.use("/api/products", product_route_1.productRoute);
app.use("/api/orders", order_route_1.orderRoute);
app.get("/", (req, res) => {
    res.send("Welcome to my Ecommerce server.");
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: "error",
        message: err.message,
    });
});
exports.default = app;
