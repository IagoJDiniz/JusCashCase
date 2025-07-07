import { CacheRepository } from "../cache-repository";
import { RedisService } from "./redis.service";

export class RedisCacheRepository implements CacheRepository {
  constructor(private redis: RedisService) {}

  async setValue(key: string, value: string): Promise<void> {
    await this.redis.set(key, value, "EX", 60 * 60 * 12); // Set expiration to 12 hours
  }
  async getValue(key: string): Promise<string | null> {
    return await this.redis.get(key);
  }
  async deleteValue(key: string): Promise<void> {
    await this.redis.del(key);
  }
}
