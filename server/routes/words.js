const express = require("express");
const wordsRouter = express.Router();
const wordsController = require("../controllers/words");

wordsRouter.post("/words", wordsController.createWord);
wordsRouter.get("/words/due", wordsController.getDueWord);
wordsRouter.delete("/words/:id", wordsController.deleteWord);
wordsRouter.put("/words/:id", wordsController.updateWord);
wordsRouter.get("/words/search", wordsController.getSearchResults);

module.exports = wordsRouter;
