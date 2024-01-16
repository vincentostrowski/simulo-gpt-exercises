const express = require("express");
const wordsRouter = express.Router();
const wordsController = require("../controllers/words");

wordsRouter.post("/words", wordsController.createWord);
wordsRouter.get("/words", wordsController.getWords);
wordsRouter.get("/words/due", wordsController.getDueWord);
wordsRouter.get("/words/queued-new", wordsController.getQueuedNewWords);
wordsRouter.delete("/words/:id", wordsController.deleteWord);
wordsRouter.put("/words/:id", wordsController.updateWord);

module.exports = wordsRouter;
