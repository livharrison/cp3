import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Question from '../views/Question.vue'
import Leaderboard from '../views/Leaderboard.vue'
import Study from '../views/Study.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/question/:id',
    name: 'question',
    component: Question
  },
  {
    path: '/Study',
    name: 'study',
    component: Study
  },
  {
    path: '/Leaderboard',
    name: 'leaderboard',
    component: Leaderboard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
