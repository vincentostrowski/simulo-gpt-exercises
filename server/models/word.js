const mongoose = require("mongoose");

const wordSchema = mongoose.Schema({
  word: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
  new: { type: Boolean, required: true },
  due: { type: Date, required: true },
  lastAttempt: Date,
  level: { type: Number, required: true },
  questions: { type: mongoose.Schema.ObjectId, ref: "QuestionSet" },
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
