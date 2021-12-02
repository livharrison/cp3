<template>
<div>
  <div class="info">

    <div class="add">
      <h2>Add yourself to the leaderboard:</h2>
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
        <p>Score</p>
        <p> # Questions answered</p>
        <p>Accuracy</p>
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
      var person = { name: this.name, age: this.age };
      this.$root.$data.leaderboard.push(person);
      this.name = "";
      this.age = null;
      console.log(this.$root.$data.leaderboard);
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
