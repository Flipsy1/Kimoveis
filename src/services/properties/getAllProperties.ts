import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";

const getAllPropertiesService = async () => {
  const propertieRepository = AppDataSource.getRepository(Properties);

  const allProperties = propertieRepository.find({
    relations: {
      category: true,
    },
  });

  return allProperties;
};

export default getAllPropertiesService;
