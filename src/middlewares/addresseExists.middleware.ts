import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Addresses } from "../entities/addresses.entity";
import { AppError } from "../errors";
import { IPropertyRequest } from "../interfaces/properties";

const addressExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const addressRepository = AppDataSource.getRepository(Addresses);

  const data: IPropertyRequest = req.body;

  const findAddresse = await addressRepository.findOneBy({
    zipCode: data.address.zipCode,
  });

  if (findAddresse) {
    return res.status(409).json({ message: "Address already exists" });
  }

  return next();
};

export default addressExistsMiddleware;
