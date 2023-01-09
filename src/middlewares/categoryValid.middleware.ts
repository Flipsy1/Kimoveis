import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Categories } from "../entities/categories.entity";

const categoryValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categorieId = req.params.id;

  const categorieRepository = AppDataSource.getRepository(Categories);

  const categorieExists = await categorieRepository.findOneBy({
    id: categorieId,
  });

  if (!categorieExists) {
    res.status(404).json({ message: "Invalid categorie id" });
  }

  return next();
};

export default categoryValidMiddleware;
