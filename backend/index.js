require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var bodyParser  = require('body-parser');
var passport	= require('passport');
const port = process.env.PORT || 3000;

//Routes
const userRoutes = require("./api/UserRoutes");
const competitionRoutes = require("./api/CompetitionRoutes");
const matchRoutes = require("./api/MatchRoutes");

const app = express();
app.use(cors({credentials: true, origin: true}));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
var passportMiddleware = require('./middleware/auth');
passport.use(passportMiddleware);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/users", userRoutes);
app.use("/api/competitions", competitionRoutes);
app.use("/api/matchs", matchRoutes);

mongoose
  .connect(process.env.MONGODB, { useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log("DATABASE CONNECTED");
    });
  })
  .catch((err) => console.log(err));
