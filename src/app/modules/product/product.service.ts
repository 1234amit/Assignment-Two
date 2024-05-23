import ProductModel from "./product.model";
import { IProduct } from "./product.interface";

// Insert product data into the database
const createProductIntoDb = async (product: IProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

// View all product data
const getAllProductsFromDb = async () => {
  const result = await ProductModel.find();
  return result;
};

// View single product by ID
const getSingleProductFromDb = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

// Update product data by ID
const updateProductInDb = async (id: string, updateData: Partial<IProduct>) => {
  const result = await ProductModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  return result;
};

// Delete product by ID
const deleteProductFromDb = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);
  return result;
};

// Search products by search term
const searchProductsFromDb = async (searchTerm: string) => {
  const result = await ProductModel.find({
    $or: [
      { name: new RegExp(searchTerm, "i") },
      { description: new RegExp(searchTerm, "i") },
    ],
  });
  return result;
};

export const ProductServices = {
  createProductIntoDb,
  getAllProductsFromDb,
  getSingleProductFromDb,
  updateProductInDb,
  deleteProductFromDb,
  searchProductsFromDb,
};
