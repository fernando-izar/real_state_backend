import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors/appError";
import { ICategoryRequest, ICategory } from "../../interfaces/categories";

const createCategoryService = async ({
  name,
}: ICategoryRequest): Promise<ICategory> => {
  const categoryRepository = AppDataSource.getRepository(Categories);

  const categoryAlreadyExists = await categoryRepository.findOneBy({ name });
  if (categoryAlreadyExists) {
    throw new AppError("Category already exists", 400);
  }

  const category = categoryRepository.create({
    name,
  });
  await categoryRepository.save(category);

  return {
    name: category.name,
    id: category.id,
  };
};

export default createCategoryService;
