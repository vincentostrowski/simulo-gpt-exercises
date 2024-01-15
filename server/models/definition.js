const mongoose = require("mongoose");

const definitionSchema = mongoose.Schema({
  definitions: [{ type: Object, required: true }],
  word: { type: String, required: true },
});

definitionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Definition = mongoose.model("definition", definitionSchema);

module.exports = Definition;
