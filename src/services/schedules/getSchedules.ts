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

  const schedules = await propertieRepository
    .createQueryBuilder("properties")
    .innerJoinAndSelect("properties.schedules", "schedules")
    .innerJoinAndSelect("schedules.user", "user")
    .innerJoinAndSelect("properties.address", "address")
    .innerJoinAndSelect("properties.category", "category")
    .where("properties.id = :id_propertie", { id_propertie: id })
    //.select(["schedules.userId"])
    .getOne();

  // const schedules = await propertieRepository.findOne({
  //   where: {
  //     id: id,
  //   },
  //   relations: {
  //     schedules: true,
  //     address: true,
  //     category: true,
  //   },
  // });

  return schedules;
};

export default getSchedulesService;
