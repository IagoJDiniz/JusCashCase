import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "@/env";

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

function authenticateToken(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction
) {
  const token = request.cookies.accessToken;

  if (!token) {
    response.status(401).json({ message: "Token não fornecido" });
    return;
  }

  jwt.verify(token, env.JWT_SECRET, (err: any) => {
    if (err) {
      response.status(401).json({ message: "Token inválido" });
      return;
    } else {
      next();
    }
  });
}

export default authenticateToken;
