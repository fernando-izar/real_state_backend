import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";
import { ICategory } from "../../interfaces/categories";
import { IProperty } from "../../interfaces/properties";
import { Properties } from "../../entities/properties.entity";

const listPropertiesCategoryService = async (
  id: string
): Promise<Categories> => {
  const categoryRepository = AppDataSource.getRepository(Categories);
  const category = await categoryRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      properties: true,
    },
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  return category;
};

export default listPropertiesCategoryService;
