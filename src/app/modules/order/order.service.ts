import OrderModel from "./order.model";
import ProductModel from "../product/product.model";
import { IOrder } from "./order.interface";

// Create a new order
const createOrderIntoDb = async (order: IOrder) => {
  const { email, productId, price, quantity } = order;

  // Check product availability
  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  if (product.inventory.quantity < quantity) {
    throw new Error("Insufficient quantity available in inventory");
  }

  // Update product inventory
  product.inventory.quantity -= quantity;
  product.inventory.inStock = product.inventory.quantity > 0;
  await product.save();

  // Create and save the order
  const newOrder = new OrderModel({ email, productId, price, quantity });
  const result = await newOrder.save();
  return result;
};

// Get all orders
const getAllOrdersFromDb = async () => {
  const result = await OrderModel.find();
  return result;
};

// Get orders by email
const getOrdersByEmailFromDb = async (email: string) => {
  const result = await OrderModel.find({ email });
  return result;
};

export const OrderServices = {
  createOrderIntoDb,
  getAllOrdersFromDb,
  getOrdersByEmailFromDb,
};
