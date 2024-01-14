const express = require("express");
const wordsRouter = express.Router();
const wordsController = require("../controllers/words");

wordsRouter.get("/words", wordsController.getWords);
//called for each new card in due view
wordsRouter.get("/words/due", wordsController.getDueWord);
wordsRouter.get("/words/queued-new", wordsController.getQueuedNewWords);

wordsRouter.put("/words/:id", wordsController.updateWord);

module.exports = wordsRouter;
