import AppDataSource from "../../data-source";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors";

const getSchedulesService = async (id: string) => {
  const propertieRepository = AppDataSource.getRepository(Properties);

  const propertieExists = await propertieRepository.findOneBy({
    id: id,
  });

  if (!propertieExists) {
    throw new AppError("Property not found", 404);
  }

  //   const schedules = await propertieRepository
  //     .createQueryBuilder("properties")
  //     .innerJoinAndSelect("properties.schedules", "schedules")
  //     .innerJoinAndSelect("schedules_users_properties.property", "property")
  //     .where("properties.id = :id_propertie", { id_propertie: id })
  //     .select([
  //       "propertie",
  //       "properties.schedules",
  //       "properties.address",
  //       "properties.category",
  //       "schedules_users_properties",
  //     ])
  //     .getRawOne();

  const schedules = await propertieRepository.findOne({
    where: {
      id: id,
    },
    relations: {
      schedules: true,
      address: true,
      category: true,
    },
  });

  return schedules;
};

export default getSchedulesService;
