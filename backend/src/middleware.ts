import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { NextFunction, Request, Response } from "express";

interface JwtPayload {
  userId: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    req.userId = decoded.userId;

    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
