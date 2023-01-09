import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { AppError } from "../../errors";
import { ICategory, ICategoryRequest } from "../../interfaces/categories";
import { categoryResponseSerializer } from "../../serializers/categorie.serializers";

const createCategoryService = async (
  categoryData: ICategoryRequest
): Promise<ICategory> => {
  const categoryRepository = AppDataSource.getRepository(Categories);

  const findCategory = await categoryRepository.findOneBy({
    name: categoryData.name,
  });

  if (findCategory) {
    throw new AppError("Category already exists", 409);
  }

  const category = categoryRepository.create(categoryData);
  await categoryRepository.save(category);

  const categoryResponse = await categoryResponseSerializer.validate(category, {
    stripUnknown: true,
  });

  return categoryResponse;
};

export default createCategoryService;
