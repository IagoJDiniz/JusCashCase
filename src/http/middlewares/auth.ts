import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "@/env";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

function authenticateToken(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction
) {
  const token = request.cookies.accessToken;

  if (!token) {
    response.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

    request.userId = payload.sub as string;

    next();
  } catch (err) {
    response.status(401).json({ message: "Token inválido" });
  }
}

export default authenticateToken;
