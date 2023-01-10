import AppDataSource from "../../data-source";
import { Categories } from "../../entities/categories.entity";

const getAllPropertiesCategoryService = async (id: string) => {
  const categoriesRepository = AppDataSource.getRepository(Categories);

  const properties = await categoriesRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      properties: true,
    },
  });

  return properties;
};

export default getAllPropertiesCategoryService;
