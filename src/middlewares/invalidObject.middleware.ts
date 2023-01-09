import { Request, Response, NextFunction } from "express";

const invalidObjectMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const keys = Object.keys(req.body);

  const invalidObject = keys.find((key) => {
    return key !== "email" && key !== "name" && key !== "password";
  });

  if (invalidObject) {
    return res.status(401).json({ message: "invalid object" });
  }

  return next();
};

export default invalidObjectMiddleware;
