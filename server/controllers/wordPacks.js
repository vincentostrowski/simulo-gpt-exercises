const WordPack = require("../models/wordPack.js");
const wordsController = require("./words.js");
const io = require("../socket.js").getIO();

const getPacks = async (req, res) => {
  const wordPacks = await WordPack.find();
  res.status(200).json(wordPacks);
};

const downloadPack = async (req, res) => {
  io.emit("downloadStart");
  console.log("hello");
  const pack = await WordPack.findById(req.params.id);
  console.log(pack);
  for (word of pack.words) {
    try {
      //do stuff for each word
      console.log(word, "this part I still need to implement lol");
    } catch (error) {
      if (error.message === "You've already added this word") {
        continue;
      } else {
        console.log(error);
      }
    }
  }
  io.emit("downloadEnd");
  res.status(200).json({ message: "Pack downloaded successfully" });
};

module.exports = {
  getPacks,
  downloadPack,
};
