<template>
<div>
  <div class="info">
    <h3>{{ question.category }} for {{ question.value }}</h3>
    <div class="card">
      <p class="q-text">{{ question.question.toUpperCase() }} </p>
    </div>

    <div class="guess" v-show="!answered">
      <form v-on:submit.prevent="setAnswer">
        <label for='answerBox'>
          <h3>Submit your answer:</h3>
        </label><br>
        <p>What is </p>
        <textarea v-model="userAnswer" name='answerBox'>Show up</textarea>
        <br>
        <button type="submit" v-on:click="updateMoney">Submit</button>
      </form>
    </div>

    <div class="results" v-show="answered">
      <p>You answered: What is {{userAnswer}} </p>
      <p id="actual">Correct answer: What is {{ question.answer }}</p>

      <div v-if="right === true">
        <h3>Way to go!</h3>
      </div>

      <div v-else>
        <h4>Better luck next time!</h4>
        <button type="submit" v-on:click="addToStudyBank()">Add to Study Bank</button>
        <button type="submit" v-on:click="gotItRight()">I got it right</button>
      </div>

      <router-link to="/"><button type="submit">Back to Home</button></router-link>

    </div>

  </div>
</div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      question: {},
      userAnswer: '',
      answered: false,
      money: 0,
      right: false,
    }
  },
  created() {
    this.question = this.$root.$data.questions.find(question => question.id === parseInt(this.$route.params.id));
  },
  computed: {

  },
  methods: {
    setAnswer() {
      this.answered = true;
    },
    addToStudyBank() {
      this.question.show = false;
      this.$root.$data.studyBank.push(this.question);
    },
    updateMoney() {
      this.$root.$data.questionsAnswered += 1;
      let thisMoney = parseInt(this.question.value.substring(1));
      if (this.userAnswer.toLowerCase() === this.question.answer.toLowerCase()) {
        this.$root.$data.money += thisMoney;
        this.$root.$data.correct += 1;
        this.right = true;
      } else {
        this.$root.$data.money -= thisMoney;
        this.right = false;
      }
    },
    gotItRight() {
      let thisMoney = parseInt(this.question.value.substring(1));
      this.right = true;
      this.$root.$data.money += thisMoney; //removing the negative amount of money
      this.$root.$data.money += thisMoney; //adding the correct amount since they got it right
      this.$root.$data.correct += 1;
    }
  }
}
</script>

<style scoped>
.intro {
  font-style: italic;
}

.info {
  text-align: center;
}

button {
  font-family: 'Korinna', serif;
  font-size: 16px;
  margin: 15px 0 0 15px;
}

.results {
  margin: 60px 0 60px 0;
}

form {
  display: block;
}

h3 {
  color: rgb(5, 5, 149);
  font-size: 25px;
}

h4 {
  color: red;
  font-size: 25px;
}

#actual {
  color: green;
}

.card {
  padding: 30px;
  background-color: rgb(5,5,149);
  width: 60%;
  margin: auto;
}

.q-text {
  font-family: 'Korinna', serif;
  color: white;
  text-align: center;
  font-size: 40px;
}

.products {
  display: flex;
  flex-wrap: wrap;
}


/* Mobile Styles */
@media only screen and (max-width: 480px) {
  h3 {
    font-size: 20px;
  }
  .card {
    padding: 15px;
    width: 90%;
  }
  .q-text {
    font-size: 20px;
  }
}

/* Tablet Styles */
@media only screen and (min-width: 481px) and (max-width: 960px) {
  .card {
    width: 90%;
  }
  .q-text {
    font-size: 35px;
  }
}


</style>
