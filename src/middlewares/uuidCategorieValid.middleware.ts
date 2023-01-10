import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Categories } from "../entities/categories.entity";

const uuidCategorieValidMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryRepository = AppDataSource.getRepository(Categories);

    const id = req.body.categoryId;

    const category = await categoryRepository.findOneBy({
      id: id,
    });

    if (!category) {
      return res.status(404).json({ message: "Invalid Categorie id" });
    }

    return next();
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export default uuidCategorieValidMiddleware;
