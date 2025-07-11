import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  JWT_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
  SCRAPER_API_KEY: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string(),
  REDIS_PASSWORD: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("❌ Variáveis de ambiente incorretas", _env.error.format());

  throw new Error("Variáveis de ambiente incorretas.");
}

export const env = _env.data;
