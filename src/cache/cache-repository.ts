export interface CacheRepository {
  setValue(key: string, value: string): Promise<void>;
  getValue(key: string): Promise<string | null>;
  deleteValue(key: string): Promise<void>;
}
