import { Document } from "mongoose";

export interface IVariant {
  type: string;
  value: string;
}

export interface IInventory {
  quantity: number;
  inStock: boolean;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: IVariant[];
  inventory: IInventory;
}
