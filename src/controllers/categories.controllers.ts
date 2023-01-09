import { Request, Response } from "express";
import { ICategoryRequest } from "../interfaces/categories";
import createCategoryService from "../services/categories/createCategory";
import getAllCategoriesService from "../services/categories/getAllCategories";
import getAllPropertiesCategoryService from "../services/categories/getAllPropertiesCategory";

const createCategoryController = async (req: Request, res: Response) => {
  const categoryData: ICategoryRequest = req.body;
  const newCategory = await createCategoryService(categoryData);
  return res.status(201).json(newCategory);
};

const getAllCategoriesController = async (req: Request, res: Response) => {
  const allCategories = await getAllCategoriesService();
  return res.status(200).json(allCategories);
};

const getAllPropertiesCategoryController = async (
  req: Request,
  res: Response
) => {
  const id: string = req.params.id;
  console.log(id);
  const allPropertiesCategory = await getAllPropertiesCategoryService(id);
  return res.status(200).json(allPropertiesCategory);
};

export {
  createCategoryController,
  getAllCategoriesController,
  getAllPropertiesCategoryController,
};
