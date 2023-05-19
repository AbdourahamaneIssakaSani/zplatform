const { RateLimiterRedis } = require("rate-limiter-flexible");
const { createClient } = require("redis");
const AppLogger = require("../utils/app-logger");

const redisClient = createClient({
  password: "4FzbJW5NPpyh8RtaSvjgJDIkpnHEi1OA",
  host: "redis-16088.c44.us-east-1-2.ec2.cloud.redislabs.com",
  port: 16088,
});

redisClient.on("error", function (err) {
  AppLogger.error("Could not establish a connection with redis🚨 " + err);
});

redisClient.on("connect", function (err) {
  AppLogger.info("Connected to redis successfully 🎉");
});

const maxRequests = 100; // hard limit
const softLimit = Math.floor(maxRequests * 0.9); // 95% of maxRequests

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  points: maxRequests,
  duration: 15 * 60, // per 15 minutes by IP
});

module.exports = (req, res, next) => {
  const key = req.user ? req.user.id : req.ip;

  rateLimiter
    .consume(key)
    .then((rateLimiterRes) => {
      const remainingPoints = rateLimiterRes.remainingPoints;
      const retrySecs = rateLimiterRes.msBeforeNext / 1000;

      res.set("X-RateLimit-Limit", maxRequests);
      res.set("X-RateLimit-Remaining", Math.max(0, remainingPoints));
      res.set(
        "X-RateLimit-Reset",
        new Date(Date.now() + retrySecs * 1000).toUTCString()
      );

      if (remainingPoints < softLimit) {
        // Exponential backoff delay
        const delay = Math.pow(2, maxRequests - remainingPoints);
        return new Promise((resolve) => setTimeout(resolve, delay)).then(() =>
          next()
        );
      } else {
        next();
      }
    })
    .catch((rateLimiterRes) => {
      const retrySecs = rateLimiterRes.msBeforeNext / 1000;
      let retryAfter;

      if (retrySecs < 60) {
        retryAfter = retrySecs + " seconds";
      } else if (retrySecs < 3600) {
        retryAfter = Math.ceil(retrySecs / 60) + " minutes";
      } else {
        retryAfter = Math.ceil(retrySecs / 3600) + " hours";
      }

      res.set("Retry-After", retrySecs);
      res
        .status(429)
        .send("Too Many Requests. Please try again after " + retryAfter + ".");
    });
};
