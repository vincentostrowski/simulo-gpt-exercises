if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const FIREBASE_SERVICE_ACCOUNT = process.env.FIREBASE_SERVICE_ACCOUNT;
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const GPT_KEY = process.env.GPT_KEY;

module.exports = {
  MONGODB_URI,
  PORT,
  FIREBASE_SERVICE_ACCOUNT,
  GPT_KEY,
};
