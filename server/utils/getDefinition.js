const config = require("./config");
const axios = require("axios");

const getDefinition = async (word) => {
  const apiKey = config.WORDS_KEY;

  const options = {
    method: "GET",
    url: `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`,
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
    },
  };

  const response = await axios.request(options);
  if (!response.data.defintions) {
    throw new Error("No definition found");
  }
  return response.data.definitions;
};

module.exports = getDefinition;
