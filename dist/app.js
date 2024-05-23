"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./app/modules/product/product.route");
const order_route_1 = require("./app/modules/order/order.route");
const app = (0, express_1.default)();
const corsConfig = {
    origin: "*",
    credential: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(express_1.default.json());
app.options("", (0, cors_1.default)(corsConfig));
app.use((0, cors_1.default)(corsConfig));
app.use("/api/products", product_route_1.productRoute);
app.use("/api/orders", order_route_1.orderRoute);
app.get("/", (req, res) => {
    res.send("Welcome to my Ecommerce server.");
});
// Error handling middleware
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).send({
        status: "error",
        message: err.message,
    });
});
exports.default = app;
