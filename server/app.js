require("./utils/firebaseAdmin");
const express = require("express");
const app = express();
const http = require("http");
const socket = require("./socket.js");
const server = http.createServer(app);
socket.init(server);

const cors = require("cors");
require("express-async-errors");
const mongoose = require("mongoose");
const config = require("./utils/config");

const middleware = require("./utils/middleware");
const usersRouter = require("./routes/users");
const wordsRouter = require("./routes/words");

mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

app.use(middleware.lowercaseFields);
app.use("/api", usersRouter);
app.use(middleware.checkFirebaseToken);
app.use("/api", wordsRouter);

app.use(middleware.unkownEndpoint);
app.use(middleware.errorHandler);

module.exports = server;
