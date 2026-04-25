export class RateLimiter {
  private cache = new Map<string, { count: number; timestamp: number }>();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests: number, windowMs: number) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  public check(ip: string): boolean {
    const now = Date.now();
    const record = this.cache.get(ip);

    if (!record) {
      this.cache.set(ip, { count: 1, timestamp: now });
      return true;
    }

    if (now - record.timestamp > this.windowMs) {
      this.cache.set(ip, { count: 1, timestamp: now });
      return true;
    }

    if (record.count >= this.maxRequests) {
      return false;
    }

    record.count += 1;
    this.cache.set(ip, record);
    return true;
  }
}

// 10 requests per minute
export const apiLimiter = new RateLimiter(10, 60 * 1000);
