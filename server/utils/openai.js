const OpenAI = require("openai");
const config = require("./config");

const openai = new OpenAI({
  apiKey: config.GPT_KEY,
});

module.exports = openai;
