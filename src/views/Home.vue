<template>
<div>
  <p class="intro">Choose a trivia question to answer!</p>
  <p class="questions">
    <router-link v-for="question in questions" :key="question.id" :to="'/question/' + question.id">
      {{question.value}}
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
  display: grid;
  grid-template: auto auto auto auto auto auto auto auto auto auto auto / 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
}

.questions a {
  text-decoration: none;
  text-align: center;
  font-size: 60px;
  color: gold;
  font-family: 'Bebas Neue', sans-serif;
  background-color: rgb(5,5,149);
  padding: 10px 0 10px 0;
}
</style>
