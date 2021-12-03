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


app.get('/api/leaderboard', async (req, res) => {
  try {
    let leaderboard = await Person.find();
    res.send({leaderboard: leaderboard});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.post('/api/leaderboard', async (req, res) => {
    const person = new Person({
    name: req.body.name,
    age: req.body.age,
    questionsAnswered: req.body.questionsAnswered,
    money: req.body.money,
    accuracy: req.body.accuracy,
  });
  try {
    await person.save();
    res.send({person:person});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.delete('/api/leaderboard/:id', async (req, res) => {
  try {
    await Person.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3000, () => console.log('Server listening on port 3000!'));
