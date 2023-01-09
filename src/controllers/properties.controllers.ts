import { Request, Response } from "express";
import { IPropertyRequest } from "../interfaces/properties";
import createPropertieService from "../services/properties/createPropertie";
import getAllPropertiesService from "../services/properties/getAllProperties";

const createPropertieController = async (req: Request, res: Response) => {
  const propertieBody: IPropertyRequest = req.body;
  const newPropertie = await createPropertieService(propertieBody);
  return res.status(201).json(newPropertie);
};

const getAllPropertiesController = async (req: Request, res: Response) => {
  const allProperties = await getAllPropertiesService();
  return res.status(200).json(allProperties);
};

export { createPropertieController, getAllPropertiesController };
