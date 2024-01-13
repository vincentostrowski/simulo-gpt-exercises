require("./utils/firebaseAdmin");
const express = require("express");
const app = express();
const cors = require("cors");
require("express-async-errors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const cors = require("cors");
const usersRouter = require("./routes/users");
const wordsRouter = require("./routes/words");

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

app.use(middleware.lowercaseFields);
app.use("/api/users", usersRouter);
app.use(middleware.checkFirebaseToken);
app.use("/api/users/words", wordsRouter);

app.use(middleware.unkownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
