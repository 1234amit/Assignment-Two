import { Request, Response } from "express";
import { orderSchema } from "./order.validator";
import { OrderServices } from "./order.service";
import { ProductServices } from "../product/product.service";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { error } = orderSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ success: false, message: error.details[0].message });
    }

    // Check if product exists and has sufficient quantity
    const product = await ProductServices.getSingleProductFromDb(
      req.body.productId
    );
    if (!product || product.inventory.quantity < req.body.quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    }

    // Update product inventory
    const updatedQuantity = product.inventory.quantity - req.body.quantity;
    const inStock = updatedQuantity > 0 ? true : false;
    await ProductServices.updateProductInDb(req.body.productId, {
      inventory: { quantity: updatedQuantity, inStock: inStock },
    });

    // Create order
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
