import { Redis } from "ioredis";
import { env } from "@/env";

export class RedisService extends Redis {
  constructor() {
    const isProduction = process.env.NODE_ENV === "production";

    super({
      host: env.REDIS_HOST,
      port: Number(env.REDIS_PORT),
      ...(isProduction && {
        password: env.REDIS_PASSWORD,
      }),
    });
  }

  //   async setValue(key: string, value: string): Promise<void> {
  //     await this.set(key, value);
  //   }

  //   async getValue(key: string): Promise<string | null> {
  //     return await this.get(key);
  //   }

  //   async deleteValue(key: string): Promise<void> {
  //     await this.del(key);
  //   }
}
