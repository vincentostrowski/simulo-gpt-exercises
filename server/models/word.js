const mongoose = require("mongoose");

const wordSchema = mongoose.Schema({
  word: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  new: { type: Boolean, required: true },
  newOrder: Number,
  due: Date,
  interval: Number,
  lastAttempt: Date,
  dateAdded: { type: Date, required: true },
  questions: { type: mongoose.Schema.ObjectId, ref: "QuestionSet" },
  questionIndex: { type: Number, required: true },
});

wordSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Word = mongoose.model("Word", wordSchema);

module.exports = Word;
