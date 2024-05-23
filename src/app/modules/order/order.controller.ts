import { Request, Response } from "express";
import { orderSchema } from "./order.validator";
import { OrderServices } from "./order.service";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    const order = await OrderServices.createOrderIntoDb(req.body);
    res.status(201).json({
      success: true,
      message: "Order created successfully!",
      data: order,
    });
  } catch (err) {
    if (err instanceof Error) {
      if (
        err.message === "Product not found" ||
        err.message === "Insufficient quantity available in inventory"
      ) {
        return res.status(400).json({ success: false, message: err.message });
      }
      res.status(500).json({ success: false, message: "Server error" });
    } else {
      res.status(500).json({ success: false, message: "Unknown server error" });
    }
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderServices.getAllOrdersFromDb();
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: orders,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ success: false, message: "Server error" });
    } else {
      res.status(500).json({ success: false, message: "Unknown server error" });
    }
  }
};

export const getOrdersByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    const orders = await OrderServices.getOrdersByEmailFromDb(email);
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully for user email!",
      data: orders,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ success: false, message: "Server error" });
    } else {
      res.status(500).json({ success: false, message: "Unknown server error" });
    }
  }
};
