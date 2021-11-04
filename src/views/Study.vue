<template>
<div>
    <div class="question">
        <h2>Study Bank</h2>
        <div class="list" v-for="(question, index) in studyBank" :key="question.id">
            <p> {{question.question}} </p>
            <button class="auto" v-on:click="removeQuestion(index)">Remove Question</button>
        </div>
    </div>

</div>
</template>

<script>
//import Question from "../components/Question.vue"
export default {
    name: 'Home',
    components: {
        //Question
    },
    props: {
        studyBank: Array,
    },
    computed: {

    },
    methods: {
        removeQuestion(question) {
            this.$root.$data.studyBank.splice(question, 1);
        },
    }
}
</script>

<style scoped>
body {
  margin: 50px 100px;
  font-family: 'Bellota Text', cursive;
}
</style>