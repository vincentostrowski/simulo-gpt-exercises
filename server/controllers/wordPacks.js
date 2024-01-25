const WordPack = require("../models/wordPack.js");
const Word = require("../models/word");
const Definition = require("../models/definition");
const QuestionSet = require("../models/questionSet");
const getDefinition = require("../utils/getDefinition");
const createQuestions = require("../utils/createQuestions");
const io = require("../socket.js").getIO();

const getPacks = async (req, res) => {
  const wordPacks = await WordPack.find();
  res.status(200).json(wordPacks);
};

const downloadPack = async (req, res) => {
  io.emit("downloadStart");
  const pack = await WordPack.findById(req.params.id);
  for (let currentWord of pack.words) {
    try {
      //check if word already added, if so skip
      const userWord = await Word.findOne({
        user: req.user._id,
        word: currentWord,
      });

      if (userWord) {
        continue;
      }

      //check if definition for this word yet to be created
      let definitionDoc = await Definition.findOne({ word: currentWord });
      if (!definitionDoc) {
        let definitions;

        definitions = await getDefinition(currentWord);
        definitionDoc = new Definition({
          word: currentWord,
          definitions,
        });
        await definitionDoc.save();
      }

      //make question set if not made yet
      let questionSet = await QuestionSet.findOne({ word: currentWord });
      let questions;
      let newQuestionSet = false;
      if (!questionSet) {
        //generate 5 questions to immediately place within document
        questions = await createQuestions(currentWord, 5);
        questionSet = new QuestionSet({
          word: currentWord,
          questions,
        });
        await questionSet.save();
        newQuestionSet = true;
      }

      const newWordsCount = await Word.countDocuments({
        user: req.user._id,
        new: true,
      });

      const date = new Date();

      const word = {
        word: currentWord,
        user: req.user._id,
        new: true,
        newOrder: newWordsCount,
        due: null,
        lastAttempt: null,
        dateAdded: date,
        questions: questionSet._id,
        definitions: definitionDoc._id,
        questionIndex: 0,
        interval: 1,
      };

      const wordDocument = new Word(word);
      await wordDocument.save();
      io.emit("wordCreated");

      //if new question set, create more questions
      //not using await, so loop can continue without this
      if (newQuestionSet) {
        createQuestions(currentWord, 35, questions)
          .then((moreQuestions) => {
            questionSet.questions.push(...moreQuestions);
            questionSet.save().catch((error) => {
              console.error("Error saving question set:", error);
            });
          })
          .catch((error) => {
            console.error("Error creating questions:", error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
  io.emit("downloadEnd");
  res.status(200).json({ message: "Pack downloaded successfully" });
};

module.exports = {
  getPacks,
  downloadPack,
};
