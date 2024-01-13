const mongoose = require("mongoose");

const questionSetSchema = mongoose.Schema({
  questions: [{ type: String }],
});

questionSetSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const QuestionSet = mongoose.model("QuestionSet", questionSetSchema);

module.exports = QuestionSet;
