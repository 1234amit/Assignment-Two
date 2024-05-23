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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const product_validator_1 = require("./product.validator");
const product_service_1 = require("./product.service");
// Create a new product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = product_validator_1.productSchema.validate(req.body);
        if (error) {
            return res
                .status(400)
                .json({ success: false, message: error.details[0].message });
        }
        const product = yield product_service_1.ProductServices.createProductIntoDb(req.body);
        res.status(201).json({
            success: true,
            message: "Product created successfully!",
            data: product,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.createProduct = createProduct;
// Get all products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield product_service_1.ProductServices.getAllProductsFromDb();
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: products,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.getAllProducts = getAllProducts;
// Get a single product by ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_service_1.ProductServices.getSingleProductFromDb(req.params.productId);
        if (!product) {
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });
        }
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: product,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.getProductById = getProductById;
// Update a product by ID
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = product_validator_1.productSchema.validate(req.body);
        if (error) {
            return res
                .status(400)
                .json({ success: false, message: error.details[0].message });
        }
        const product = yield product_service_1.ProductServices.updateProductInDb(req.params.productId, req.body);
        if (!product) {
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });
        }
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: product,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.updateProduct = updateProduct;
// Delete a product by ID
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield product_service_1.ProductServices.deleteProductFromDb(req.params.productId);
        if (!product) {
            return res
                .status(404)
                .json({ success: false, message: "Product not found" });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.deleteProduct = deleteProduct;
// Search products
const searchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const products = yield product_service_1.ProductServices.searchProductsFromDb(searchTerm);
        res.status(200).json({
            success: true,
            message: `Products matching search term '${searchTerm}' fetched successfully!`,
            data: products,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.searchProducts = searchProducts;
