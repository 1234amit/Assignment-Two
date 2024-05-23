import { Document } from "mongoose";

// interface for IOrder
export interface IOrder extends Document {
  email: string;
  productId: string;
  price: number;
  quantity: number;
}
