"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config.js");
const zod_1 = require("zod");
const envSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(["dev", "test", "production"]).default("dev"),
    JWT_SECRET: zod_1.z.string(),
    DATABASE_URL: zod_1.z.string(),
    BODY_DECRYPTION_KEY: zod_1.z.string(),
    PORT: zod_1.z.coerce.number().default(3333),
});
const _env = envSchema.safeParse(process.env);
if (_env.success === false) {
    console.error("❌ Variáveis de ambiente incorretas", _env.error.format());
    throw new Error("Variáveis de ambiente incorretas.");
}
exports.env = _env.data;
