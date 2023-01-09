import { Request, Response } from "express";
import { IScheduleData } from "../interfaces/schedules";
import createSchedulesService from "../services/schedules/createSchedules";
import getSchedulesService from "../services/schedules/getSchedules";

const createScheduleController = async (req: Request, res: Response) => {
  const data: IScheduleData = req.body;
  const newScheduler = await createSchedulesService(data);
  return res.status(201).json(newScheduler);
};

const getSchedulesController = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const schedules = await getSchedulesService(id);
  return res.status(200).json(schedules);
};

export { createScheduleController, getSchedulesController };
