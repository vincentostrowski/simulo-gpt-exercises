const Word = require("../models/word");
const QuestionSet = require("../models/questionSet");
const axios = require("axios");
const createQuestions = require("../utils/createQuestions");

const checkWordExists = async (word) => {
  try {
    const response = await axios.get(
      //whatever dictionary api I use
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=your-api-key`
    );
    return response.data.length > 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const createWord = async (req, res) => {
  //checking if word exists in dictionary API
  //done in the backend to prevent user from potentially adding non-words
  const wordExists = await checkWordExists(req.body.word);

  if (!wordExists) {
    return res.status(400).json({ message: "Word does not exist" });
  }

  //Find questionSet for the word
  //if not yet made, make one
  let questionSet = await QuestionSet.findOne({ word: req.body.word });
  let questions;
  if (!questionSet) {
    //generate 5 questions to immediately place within document
    questions = await createQuestions(req.body.word, 5);
    questionSet = new QuestionSet({
      word: req.body.word,
      questions,
    });
    await questionSet.save();
  }

  //Cards newOrder will be the amount of new cards that exist
  const newWordsCount = await Word.countDocuments({
    user: req.user._id,
    new: true,
  });

  const date = new Date();

  const word = {
    word: req.body.word,
    user: req.user._id,
    new: true,
    newOrder: newWordsCount,
    due: null,
    lastAttempt: null,
    dateAdded: date,
    questions: questionSet._id,
    questionIndex: 0,
    interval: 1,
  };

  const wordDocument = new Word(word);
  const wordSaved = await wordDocument.save();
  res.status(201).json(wordSaved);

  //after making word document available for user to use
  //make more questions for the questionSet on server
  //make subsequent generate 35, using first response
  const moreQuestions = await createQuestions(req.body.word, 35, questions);
  questionSet.questions.push(...moreQuestions);
  await questionSet.save();
};

const getWords = async (req, res) => {
  //implement some sort of pagination
  const words = await Word.find({ user: req.user._id });
  res.status(200).json(words);
};

const getDueWord = async (req, res) => {
  const word = await Word.findOne({
    $or: [
      { user: req.user._id, new: false, due: { $lte: new Date() } },
      { user: req.user._id, new: true, newOrder: 0 },
    ],
  });

  //returning null if no word to study
  // make sure to notify user "No words to study, if just added may take a few seconds"
  if (!word) {
    res.status(200).json(word);
    return;
  }

  //want to get 5 fill ins & return as questions []
  const questions = [];
  const questionSet = await QuestionSet.findById(word.questions);

  //if GPT not needed
  for (let i = 0; i < 5; i++) {
    questions.push(questionSet.questions[word.questionIndex + i]);
  }

  word.questionIndex += 5;
  await word.save();
  res.status(200).json({ word, questions });

  //make more gpt generated questions if user has index reaches end of
  if (questionSet.questions.length - word.questionIndex < 5) {
    const moreQuestions = await createQuestions(
      req.body.word,
      35,
      questionSet.questions
    );
    questionSet.questions.push(...moreQuestions);
    await questionSet.save();
  }
};

const getQueuedNewWords = async (req, res) => {
  //implement some sort of pagination
  const words = await Word.find({
    user: req.user._id,
    new: true,
  });
};

const updateWord = async (req, res) => {
  const word = await Word.findById(req.params.id);

  //if word is new and queue order is being updated
  if ((req.body.ease = undefined)) {
    const newPosition = req.body.newPosition;

    const oldPosition = card.newOrder;
    card.newOrder = newPosition;
    await card.save();

    if (oldPosition < newPosition) {
      await Word.updateMany(
        {
          user: req.user._id,
          new: true,
          newOrder: { $gt: oldPosition, $lte: newPosition },
        },
        { $inc: { newOrder: -1 } }
      );
    } else if (oldPosition > newPosition) {
      await Word.updateMany(
        {
          user: req.user._id,
          new: true,
          newOrder: { $gte: newPosition, $lt: oldPosition },
        },
        { $inc: { newOrder: 1 } }
      );
    }

    res.status(200).json(card);
    return;
  }

  //if word is new
  word.new = false;
  word.newOrder = null;

  word.lastAttempt = new Date();

  switch (req.body.ease) {
    case "easy":
      word.interval *= 2;
      break;
    case "hard":
      word.inerval *= 0.5;
  }

  //make word.due equal to previous date + amount of days given by word.interval
  const intervalMilliseconds = word.interval * 24 * 60 * 60 * 1000;
  const previousDate = new Date(word.due);
  previousDate.setTime(previousDate.getTime() + intervalMilliseconds);
  word.due = previousDate;

  word.save();

  res.status(200).json(word);
};

module.exports = {
  createWord,
  getWords,
  getDueWord,
  getQueuedNewWords,
  updateWord,
};
