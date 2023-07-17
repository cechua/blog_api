require("dotenv").config();

const passport = require("passport");
require("./helpers/passport");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRouter = require("./routes/api");
const mongoDb = process.env.DB_URL;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

//add frontend url to allow access
let corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200,
};

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.options("*", cors(corsOptions));

app.use("/api", cors(corsOptions), apiRouter);

app.listen(3000, () => console.log("app listening on port 3000!"));
