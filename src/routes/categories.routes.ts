import { Router } from "express";
import {
  createCategoryController,
  getAllCategoriesController,
  getAllPropertiesCategoryController,
} from "../controllers/categories.controllers";
import authMiddleware from "../middlewares/auth.middleware";
import categoryValidMiddleware from "../middlewares/categoryValid.middleware";
import dataIsValid from "../middlewares/dataIsValid.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";
import { categoryRequestSerializer } from "../serializers/categorie.serializers";

const categoriesRoutes = Router();

categoriesRoutes.post(
  "",
  authMiddleware,
  dataIsValid(categoryRequestSerializer),
  isAdmMiddleware,
  createCategoryController
);

categoriesRoutes.get("", getAllCategoriesController);

categoriesRoutes.get(
  "/:id/properties",
  categoryValidMiddleware,
  getAllPropertiesCategoryController
);

export default categoriesRoutes;
