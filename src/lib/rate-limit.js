import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
const hasUpstash = !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;
if (!hasUpstash) {
    console.warn('Upstash environment variables are missing. Rate limiting will be disabled.');
}
const redis = hasUpstash
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
    : null;
// Create a new ratelimiter, that allows 10 requests per 10 seconds
export const searchRateLimit = redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(10, '10 s'),
        analytics: true,
        prefix: 'ratelimit:search',
    })
    : null;
// Bidding might need slightly higher or special limits
export const auctionRateLimit = redis
    ? new Ratelimit({
        redis,
        limiter: Ratelimit.slidingWindow(5, '10 s'),
        analytics: true,
        prefix: 'ratelimit:auction',
    })
    : null;
