<template>
<div>
  <div class="info">

    <div class="add">
      <h2>When you're done playing, add yourself to the leaderboard!</h2>
      <input v-model="name" placeholder="Name">
      <p></p>
      <input v-model="age" type="number" placeholder="Age">
      <p></p>
      <button @click="submit">Submit</button>
      <hr>
    </div>

    <h1> leaderboard</h1>

    <div class="person" v-for="person in leaderboard" :key="person.name">
      <h2>{{person.name}}</h2>
      <div class="person-info">
        <p>${{person.money}}</p>
        <p>Answered {{person.questionsAnswered}} questions</p>
        <p>{{person.accuracy}}% accuracy</p>
        <p>Age: {{person.age}}</p>
      </div>
    </div>

  </div>
</div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      name: "",
      age: null,
      leaderboard: [],
    }
  },
  created() {
    this.getLeaderboard();
  },
  computed: {

  },
  methods: {
    getLeaderboard() {
      this.leaderboard = this.$root.$data.leaderboard;
    },
    submit() {
      var acc = ((this.$root.$data.correct / this.$root.$data.questionsAnswered) * 100).toFixed(2);
      var person = { name: this.name,
                     age: this.age,
                     questionsAnswered: this.$root.$data.questionsAnswered,
                     money: this.$root.$data.money,
                     accuracy: acc
                   };
      this.$root.$data.leaderboard.push(person);
      this.name = "";
      this.age = null;
      this.$root.$data.money = 0;
      this.$root.$data.questionsAnswered = 0;
      this.$root.$data.correct = 0;
    }
  }
}
</script>

<style scoped>

.info {
  text-align: center;
}

button {
  margin: 0 0 20px 0;
}

.person {
  background-color: rgb(240,240,240);
  padding: 5px;
  display: flex;
  justify-content: space-around;
}

.person-info {
  text-align: left;
}

h2 {
  margin: 10px;
  font-family: 'Bebas Neue';
  color: rgb(5,5,149);
  font-size: 40px;
}


/* Mobile Styles */
@media only screen and (max-width: 480px) {
  h3 {
    font-size: 20px;
  }
}

/* Tablet Styles */
@media only screen and (min-width: 481px) and (max-width: 960px) {

}

</style>
