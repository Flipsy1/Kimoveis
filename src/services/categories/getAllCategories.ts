import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";
import { ICategory } from "../../interfaces/categories";
import { allCategoriesSerializer } from "../../serializers/categorie.serializers";

const getAllCategoriesService = async (): Promise<ICategory[]> => {
  const categorieRepostory = AppDataSource.getRepository(Categories);

  const categories = await categorieRepostory.find();

  const categoriesResponse = allCategoriesSerializer.validate(categories, {
    stripUnknown: true,
  });

  return categoriesResponse;
};

export default getAllCategoriesService;
