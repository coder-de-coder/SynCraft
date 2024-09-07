import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization as unknown as string;

  try {
    const payload = jwt.verify(token, JWT_PASSWORD);

    // @ts-ignore
    req.id = payload.indexOf;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "You are not Logged In",
    });
  }
};
