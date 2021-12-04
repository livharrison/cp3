const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  questionsAnswered: Number,
  money: Number,
  accuracy: String,
});

personSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
});

personSchema.set('toJSON', {
  virtuals: true
});

const Person = mongoose.model('Person', personSchema);


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

app.get('/api/leaderboard', async (req, res) => {
  try {
    let leaderboard = await Person.find();
    res.send({leaderboard: leaderboard});
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


app.put('/api/leaderboard/:id', async (req, res) => {
  try {
    var person = await Person.findOne({
      _id: req.params.id
    });
    person.name = req.body.name;
    person.age = req.body.age;
    person.save();

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3001, () => console.log('Server listening on port 3001!'));
