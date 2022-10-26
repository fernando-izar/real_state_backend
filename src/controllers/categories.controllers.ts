import { Request, Response } from "express";
import { ICategoryRequest } from "../interfaces/categories";
import createCategoryService from "../services/categories/createCategory.service";
import listCategoriesService from "../services/categories/listCategories.service";
import listPropertiesCategoryService from "../services/categories/listPropertiesCategory.service";

const createCategoryController = async (req: Request, res: Response) => {
  try {
    const category: ICategoryRequest = req.body;
    const createdCategory = await createCategoryService(category);
    return res.status(201).json(createdCategory);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
};

const listCategoriesController = async (req: Request, res: Response) => {
  const categories = await listCategoriesService();
  return res.json(categories);
};

const listPropertiesCategoryController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const propertiesCategory = await listPropertiesCategoryService(id);
  return res.json(propertiesCategory);
};

export {
  createCategoryController,
  listCategoriesController,
  listPropertiesCategoryController,
};
