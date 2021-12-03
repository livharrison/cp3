<template>
<div>
    <div class="list">
        <h2>Study Bank</h2>
        <div class="question" v-for="(question, index) in studyBank" :key="question.id">
            <p> {{question.question}} </p>
            <button class="auto" v-on:click="toggleShow(question)" v-if="question.show === false">Show Answer</button>
            <button class="auto" v-on:click="toggleShow(question)" v-if="question.show ===true">Hide Answer</button>
            <div class="answer" v-if="question.show === true">
                <p> {{question.answer}} </p>
            </div>
            <button class="auto" v-on:click="removeQuestion(index)">Remove Question</button>
            <hr>
        </div>
    </div>

</div>
</template>

<script>
export default {
    name: 'Home',
    data() {
        return {
            // this var is not used
            show: false,
        }
    },
    computed: {
        studyBank() {
            return this.$root.$data.studyBank;
        }
    },
    methods: {
        removeQuestion(question) {
            this.$root.$data.studyBank.splice(question, 1);
        },
        toggleShow(question) {
            this.$root.$data.studyBank.push("x");
            this.$root.$data.studyBank.pop();

            question.show = !question.show;
        }
    }
}
</script>

<style scoped>


form {
  display: block;
}

h2 {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 40px;
  color: rgb(5,5,149);
  margin: 40px 0px 40px 0px;
  background-color: gold;
  padding: 20px;
}

p {
    font-family: 'Korinna', serif;
    font-size: 20px;
}

.answer {
    background-color: rgb(5,5,149);
    color: white;
    padding: 10px;
    margin: 10px 10px 10px 0px;
}

.auto {
    font-family: 'Bellota Text', cursive;
    padding: 5px;
    margin: 10px 10px 10px 0px;
}

</style>