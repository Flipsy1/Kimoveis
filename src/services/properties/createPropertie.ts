import AppDataSource from "../../data-source";
import { Addresses } from "../../entities/addresses.entity";
import { Categories } from "../../entities/categories.entity";
import { Properties } from "../../entities/properties.entity";
import { AppError } from "../../errors";
import {
  IPropertyRequest,
  IPropertyResponse,
} from "../../interfaces/properties";

const createPropertieService = async (
  data: IPropertyRequest
): Promise<IPropertyResponse> => {
  const propertieRepository = AppDataSource.getRepository(Properties);
  const addresseRepository = AppDataSource.getRepository(Addresses);
  const categoryRepository = AppDataSource.getRepository(Categories);

  const id = data.categoryId;

  const category = await categoryRepository.findOneBy({
    id: id,
  });

  const newPropertie = propertieRepository.create(data);
  await propertieRepository.save(newPropertie);

  const address = addresseRepository.create(data.address);
  await addresseRepository.save(address);

  const propertieAddresse = propertieRepository.create({
    ...newPropertie,
    address,
    category,
  });
  await propertieRepository.save(propertieAddresse);

  return propertieAddresse;
};

export default createPropertieService;
