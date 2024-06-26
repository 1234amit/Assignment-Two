"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoute = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const router = (0, express_1.Router)();
router.post("/", product_controller_1.createProduct);
router.get("/", product_controller_1.getAllProducts);
router.get("/search", product_controller_1.searchProducts);
router.get("/:productId", product_controller_1.getProductById);
router.put("/:productId", product_controller_1.updateProduct);
router.delete("/:productId", product_controller_1.deleteProduct);
exports.productRoute = router;
