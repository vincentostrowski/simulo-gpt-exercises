const Word = require("../models/word");
const Definition = require("../models/definition");
const QuestionSet = require("../models/questionSet");
const getDefinition = require("../utils/getDefinition");
const createQuestions = require("../utils/createQuestions");

const createWord = async (req, res) => {
  //Find definition for the word
  //if not yet made, make one
  let definitionDoc = await Definition.findOne({ word: req.body.word });
  if (!definitionDoc) {
    let definitions;
    try {
      definitions = await getDefinition(req.body.word);
    } catch (error) {
      res.status(500).send({ error: "Failed to get definition" });
      return;
    }
    definitionDoc = new Definition({
      word: req.body.word,
      definitions,
    });
    await definitionDoc.save();
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
    definitions: definitionDoc._id,
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

  const definitions = await Definition.findById(word.definitions);

  //if GPT not needed
  for (let i = 0; i < 3; i++) {
    if (word.questionIndex + i < questionSet.questions.length) {
      questions.push(questionSet.questions[word.questionIndex + i]);
    }
  }

  res.status(200).json({ word, questions, definitions });
};

const getQueuedNewWords = async (req, res) => {
  //implement some sort of pagination
  const words = await Word.find({
    user: req.user._id,
    new: true,
  }).sort({ newOrder: 1 });

  res.status(200).json(words);
};

const updateWord = async (req, res) => {
  const word = await Word.findById(req.params.id);

  //if word is new and queue order is being updated
  if (req.body.ease === undefined) {
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
  if (word.new === true) {
    word.new = false;
    word.newOrder = null;
    await Word.updateMany(
      {
        user: req.user._id,
        new: true,
        newOrder: { $type: "number" },
      },
      { $inc: { newOrder: -1 } }
    );
  }

  word.lastAttempt = new Date();

  switch (req.body.ease) {
    case "easy":
      word.interval *= 2;
      break;
    case "hard":
      word.interval = Math.max(1, Math.floor(word.interval / 2));
      break;
  }

  //make word.due equal to previous date + amount of days given by word.interval
  const intervalMilliseconds = word.interval * 24 * 60 * 60 * 1000;
  let currentDate = new Date();
  word.due = new Date(currentDate.getTime() + intervalMilliseconds);

  //only when user uses questions from card should index move on to newer questions
  word.questionIndex += 3;
  //make more gpt generated questions if user has index reaches end of
  const questionSet = await QuestionSet.findById(word.questions);
  if (questionSet.questions.length - word.questionIndex <= 5) {
    const moreQuestions = await createQuestions(
      req.body.word,
      35,
      questionSet.questions
    );
    questionSet.questions.push(...moreQuestions);
    await questionSet.save();
  }

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
