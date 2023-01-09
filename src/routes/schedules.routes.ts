import { Router } from "express";
import {
  createScheduleController,
  getSchedulesController,
} from "../controllers/schedules.controllers";
import dataIsValid from "../middlewares/dataIsValid.middleware";
import { createSchedulesRequestSerializer } from "../serializers/schedule.serializer";
import authMiddleware from "../middlewares/auth.middleware";
import addUserIdToBody from "../middlewares/addUserIdToBody";
import isAdmMiddleware from "../middlewares/isAdm.middleware";

const schedulesRoutes = Router();

schedulesRoutes.post(
  "",
  authMiddleware,
  addUserIdToBody,
  dataIsValid(createSchedulesRequestSerializer),
  createScheduleController
);
schedulesRoutes.get(
  "/properties/:id",
  authMiddleware,
  isAdmMiddleware,
  getSchedulesController
);

export default schedulesRoutes;
