const wordPacksRouter = require("express").Router();
const wordPacksController = require("../controllers/wordPacks");

wordPacksRouter.get("/", wordPacksController.getPacks);
wordPacksRouter.get("/download/:id", wordPacksController.downloadPack);

module.exports = wordPacksRouter;
