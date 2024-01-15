const express = require("express");
const usersController = require("../controllers/users");
const usersRouter = express.Router();

usersRouter.post("/users", usersController.createUser);

module.exports = usersRouter;
