import { Request, Response, NextFunction } from "express";

export function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey != process.env.SCRAPER_API_KEY) {
    res.status(403).json({ error: "Não autorizado" });
  }

  next();
}
