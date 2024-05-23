import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  searchProducts,
  updateProduct,
} from "./product.controller";

const router = Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
router.get("/search", searchProducts);
router.get("/:productId", getProductById);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

export const productRoute = router;
