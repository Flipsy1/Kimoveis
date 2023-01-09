import { Request, Response, NextFunction } from "express";

const addUserIdToBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.body = { ...req.body, userId: req.user.id };

  return next();
};

export default addUserIdToBody;
