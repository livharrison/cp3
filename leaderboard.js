const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  questionsAnswered: Number,
  money: Number,
  accuracy: Number,
});

personSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
});

personSchema.set('toJSON', {
  virtuals: true
});

const Person = mongoose.model('Person', personSchema);
