import { Request, Response } from "express";
import Product from "../Models/productModel";

export const handleGetAllProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleGetById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id, req.body);
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleUpdateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const products = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!products) {
      res.status(404).json({ message: "product not found" });
      return;
    }

    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleCreateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  //     try {
  //       const { name, price, description, category, inStock } = req.body;
  //       const newProduct = new Product({ name, price, description, category, inStock });
  //       await newProduct.save();
  //       res.status(201).json(newProduct);
  //     } catch (error:any) {
  //       res.status(500).json({ message: error.message });
  //     }
  //   };
  try {
    const products = await Product.create(req.body);
    res.status(200).json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//Delete method
export const handleDeleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
