<template>
<div>
  <div class="info">

    <div class="add">
      <h2>When you're done playing, add yourself to the leaderboard!</h2>
      <input v-model="name" placeholder="Name">
      <p></p>
      <input v-model="age" type="number" placeholder="Age">
      <p></p>
      <button @click="addLeader">Submit</button>
      <hr>
    </div>

    <h1> leaderboard</h1>

    <div class="person" v-for="person in leaderboard" v-bind:key="person.id">
      <h2>{{person.name}}</h2>

      <div class="person-info">
        <p>${{person.money}}</p>
        <p>Answered {{person.questionsAnswered}} questions</p>
        <p>{{person.accuracy}}% accuracy</p>
        <p>Age: {{person.age}}</p>

        <button class="auto" v-on:click="deleteLeader(person)">Remove</button>
        <button class="auto" v-on:click="editPerson(person)">Edit Information</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      name: "",
      age: null,
      leaderboard: [],
      findName: "",
      findLeader: null,
    }
  },
  created() {
    this.getLeaderboard();
  },
  methods: {
    selectLeader(leader) {
      this.findName = "";
      this.findLeader = leader;
    },
    async getLeaderboard() {
      try {
        let response = await axios.get("/api/leaderboard");
        this.leaderboard = response.data.leaderboard;
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteLeader(leader) {
      try {
        await axios.delete("api/leaderboard/" + leader.id);
        this.getLeaderboard();
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async addLeader() {
      var acc = ((this.$root.$data.correct / this.$root.$data.questionsAnswered) * 100).toFixed(2);
      console.log(acc);
      try {
        await axios.post("api/leaderboard", {
          name: this.name,
          age: this.age,
          questionsAnswered: this.$root.$data.questionsAnswered,
          money: this.$root.$data.money,
          accuracy: acc
        });
        this.name = "";
        this.age = null;
        this.$root.$data.money = 0;
        this.$root.$data.questionsAnswered = 0;
        this.$root.$data.correct = 0;
      } catch (error) {
        console.log(error);
      }
    },

    async editPerson(leader) {
      try {
        await axios.put("/api/leaderboard/" + leader.id, {
          name: this.findLeader.name,
          age: this.findLeader.age,
        });
        this.findLeader = null;
        this.getLeaderBoard();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
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
