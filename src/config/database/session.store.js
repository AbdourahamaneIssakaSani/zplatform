const MongoStore = require("connect-mongo");
/**
 * Creates a new MongoDB-based session store for `express-session`.
 * @type {import("connect-mongo").MongoStore<import("express-session").Session>}
 */
const sessionStore = MongoStore.create({
  mongoUrl: process.env.V1_MONGO_URI,
  ttl: 60 * 60 * 24, // 1 day
  collectionName: "auth_sessions",
});

module.exports = sessionStore;
