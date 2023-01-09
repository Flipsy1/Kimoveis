import { Router } from "express";
import {
  createPropertieController,
  getAllPropertiesController,
} from "../controllers/properties.controllers";
import addressExistsMiddleware from "../middlewares/addresseExists.middleware";
import authMiddleware from "../middlewares/auth.middleware";
import dataIsValid from "../middlewares/dataIsValid.middleware";
import isAdmMiddleware from "../middlewares/isAdm.middleware";
import uuidCategorieValidMiddleware from "../middlewares/uuidCategorieValid.middleware";
import propertieSerializer from "../serializers/property.serializer";

const propertieRoutes = Router();

propertieRoutes.post(
  "",
  authMiddleware,
  isAdmMiddleware,
  dataIsValid(propertieSerializer),
  uuidCategorieValidMiddleware,
  addressExistsMiddleware,
  createPropertieController
);

propertieRoutes.get("", getAllPropertiesController);

export default propertieRoutes;
