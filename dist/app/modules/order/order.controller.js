"use strict";
// import { Request, Response } from "express";
// import { orderSchema } from "./order.validator";
// import productModel from "../product/product.model";
// import orderModel from "./order.model";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrdersByEmail = exports.getAllOrders = exports.createOrder = void 0;
const order_validator_1 = require("./order.validator");
const order_service_1 = require("./order.service");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = order_validator_1.orderSchema.validate(req.body);
        if (error) {
            return res
                .status(400)
                .json({ success: false, message: error.details[0].message });
        }
        const order = yield order_service_1.OrderServices.createOrderIntoDb(req.body);
        res.status(201).json({
            success: true,
            message: "Order created successfully!",
            data: order,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            if (err.message === "Product not found" ||
                err.message === "Insufficient quantity available in inventory") {
                return res.status(400).json({ success: false, message: err.message });
            }
            res.status(500).json({ success: false, message: "Server error" });
        }
        else {
            res.status(500).json({ success: false, message: "Unknown server error" });
        }
    }
});
exports.createOrder = createOrder;
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_service_1.OrderServices.getAllOrdersFromDb();
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
            data: orders,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ success: false, message: "Server error" });
        }
        else {
            res.status(500).json({ success: false, message: "Unknown server error" });
        }
    }
});
exports.getAllOrders = getAllOrders;
const getOrdersByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const orders = yield order_service_1.OrderServices.getOrdersByEmailFromDb(email);
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully for user email!",
            data: orders,
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ success: false, message: "Server error" });
        }
        else {
            res.status(500).json({ success: false, message: "Unknown server error" });
        }
    }
});
exports.getOrdersByEmail = getOrdersByEmail;
