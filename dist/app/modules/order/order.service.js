"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const order_model_1 = __importDefault(require("./order.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
// Create a new order
const createOrderIntoDb = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, productId, price, quantity } = order;
    // Check product availability
    const product = yield product_model_1.default.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    if (product.inventory.quantity < quantity) {
        throw new Error("Insufficient quantity available in inventory");
    }
    // Update product inventory
    product.inventory.quantity -= quantity;
    product.inventory.inStock = product.inventory.quantity > 0;
    yield product.save();
    // Create and save the order
    const newOrder = new order_model_1.default({ email, productId, price, quantity });
    const result = yield newOrder.save();
    return result;
});
// Get all orders
const getAllOrdersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find();
    return result;
});
// Get orders by email
const getOrdersByEmailFromDb = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find({ email });
    return result;
});
exports.OrderServices = {
    createOrderIntoDb,
    getAllOrdersFromDb,
    getOrdersByEmailFromDb,
};
