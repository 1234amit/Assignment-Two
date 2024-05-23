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
exports.ProductServices = void 0;
const product_model_1 = __importDefault(require("./product.model"));
// Insert product data into the database
const createProductIntoDb = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.create(product);
    return result;
});
// View all product data
const getAllProductsFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.find();
    return result;
});
// View single product by ID
const getSingleProductFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findById(id);
    return result;
});
// Update product data by ID
const updateProductInDb = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findByIdAndUpdate(id, updateData, {
        new: true,
    });
    return result;
});
// Delete product by ID
const deleteProductFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findByIdAndDelete(id);
    return result;
});
// Search products by search term
const searchProductsFromDb = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.find({
        $or: [
            { name: new RegExp(searchTerm, "i") },
            { description: new RegExp(searchTerm, "i") },
        ],
    });
    return result;
});
exports.ProductServices = {
    createProductIntoDb,
    getAllProductsFromDb,
    getSingleProductFromDb,
    updateProductInDb,
    deleteProductFromDb,
    searchProductsFromDb,
};
