import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getOrdersByEmail,
} from "./order.controller";

const router = Router();

router.post("/", createOrder);
router.get("/", getAllOrders);
router.get("/search", getOrdersByEmail);

export const orderRoute = router;
