const mongoose = require("mongoose");

const wordPackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  words: {
    type: [String],
    required: true,
  },
  coverURL: String,
});

const WordPack = mongoose.model("WordPack", wordPackSchema);

module.exports = WordPack;
