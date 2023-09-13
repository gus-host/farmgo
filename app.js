const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv/config");

app.use(cors({ origin: "http://farmgo-backend.farmgo.co.farmgo.co" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true },
  { useUnifiedTopology: true }
);

// create a data Schema
const emailsSchema = {
  email: String,
};

const Email = mongoose.model("emails", emailsSchema);

app.get("/", function (req, res) {
  res.set("Content-Type", "text/html; charset=utf-8");
  res.send("Farmgo.co is connected");
});

app.post("/", function (req, res) {
  let newEmail = new Email({
    email: req.body.email,
  });
  newEmail.save();
  return res.redirect("/");
});

const port = process.env.PORT || 5000;
app.listen(443);
