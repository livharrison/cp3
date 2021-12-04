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

    <div v-for="(person, index) in sortedLeaderboard" v-bind:key="person.id">
      <h2 v-if="index === 0"> High Score: {{ person.name }} - ${{ person.money }} </h2>

      <div class="person">
        <h3> # {{ index + 1}} </h3>
        <h2>{{person.name}}</h2>

        <div class="person-info">
          <p>${{person.money}}</p>
          <p>Answered {{person.questionsAnswered}} questions</p>
          <p>{{person.accuracy}}% accuracy</p>
          <p>Age: {{person.age}}</p>
          <button class="auto" v-on:click="deleteLeader(person)">Remove</button>
        </div>

        <div class="edit">
          <p>Edit information</p>
          <input v-model="newNames[person.id]" placeholder="Edit name">
          <p></p>
          <input v-model="newAges[person.id]" type="number" placeholder="Edit age">
          <p></p>
          <button class="auto" v-on:click="editPerson(person)">Save</button>
        </div>

      </div> <!-- closes person -->
    </div> <!-- closes the one with the v-for -->

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
      currID: null,
      newNames: {},
      newAges: {},
    }
  },
  created() {
    this.getLeaderboard();
  },
  computed: {
    sortedLeaderboard() {
      let sorted = this.leaderboard;
      return sorted.sort((a, b) => (a.money > b.money) ? -1 : 1);
    }
  },
  methods: {
    setNewName(name) {
      if (!(this.currID in this.newNames))
        this.set(this.newNames, this.currID, {
        name: "",
      });
      this.newNames[this.currID] = name;
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
        this.getLeaderboard();
      } catch (error) {
        console.log(error);
      }
    },
    async editPerson(person) {
      let id = person.id;
      let newName = this.newNames[id];
      if (this.newNames[id] === "" ||
          this.newNames[id] === undefined ||
          this.newNames[id] === null) {
        newName = person.name;
      }
      let newAge = this.newAges[id];
      if (this.newAges[id] === null ||
          this.newAges[id] === undefined) {
        newAge = person.age;
      }

      try {
        await axios.put("/api/leaderboard/" + id, {
          name: newName,
          age: newAge,
        });

        this.newNames[id] = null;
        this.newAges[id] = null;
        this.getLeaderboard();

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

.edit {
  display: block;
  padding: 20px 0 0 0;
}

h2 {
  margin: 10px;
  font-family: 'Bebas Neue';
  color: rgb(5,5,149);
  font-size: 40px;
}

h1 {
  background-color: gold;
  margin: 40px 0px 40px 0px;
}

h3 {
  margin: 10px;
  font-family: 'Bebas Neue';
  color: rgb(0, 0, 0);
  font-size: 50px;
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
