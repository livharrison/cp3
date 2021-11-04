<template>
<div>
  <p class="intro">Choose a trivia question to answer!</p>
  <p class="questions">
    <router-link v-for="question in questions" :key="question.id" :to="'/question/' + question.id">
      <p class="question">{{question.value}}</p>
      <!--img src="/images/question_card.png"-->
    </router-link>
  </p>
</div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    questions() {
      return this.$root.$data.questions;
    }
  }
}
</script>

<style scoped>
.intro {
  font-style: italic;
}

.questions {
 /* display: flex; */
  /* flex-wrap: wrap; */
  display: grid;
  grid-template: auto auto auto auto auto auto auto auto auto auto auto / 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
}

/*
.questions img {
  border: 1px solid #333;
  height: 70px;
  width: 110px;
  margin-left: 10px;
  object-fit: cover;
}*/

a {
  text-decoration: none;
  margin: auto;
  height: 80px;
}

.question {
  background-color: rgb(5,5,149);
  font-family: 'Bebas Neue', sans-serif;
  text-align: center;
  font-size: 50px;
  color: gold;
  height: 70px;
  width: 110px;
}

.question p {

}
</style>
