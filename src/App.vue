<template>
<div id="app">
  <div class="header">
    <h1>Jeopardy</h1>
    <div id="header-items">
      <router-link to="/"> <p>HOME</p> </router-link>
      <p><b>${{this.$root.$data.money}}</b></p>
      <router-link to="/study"> <p>STUDY BANK</p> </router-link>
    </div>
    <hr>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <p>Vue Jeopardy by Maura Pierce & Olivia Harrison</p>
    <a href="https://github.com/livharrison/cp3" target="_blank">Github Repository</a>
  </div>
</div>
</template>

<style>
html {}

body {
  margin: 50px 100px;
  font-family: 'Bellota Text', cursive;
}

#app {}

@font-face {
  font-family: 'Korinna';
  src: url('Korinna-Regular.otf')
       format('opentype');
}

h1 {
  font-family: 'Bebas Neue', sans-serif;
  text-align: center;
  font-size: 60px;
  color: rgb(5,5,149);
  margin: 40px 0 0 0;
}

#header-items {
  font-family: 'Korinna';
  display: flex;
  justify-content: space-between;
  width: 55%;
  margin: auto;
}

#header-items a {
  text-decoration: none;
  color: black;
}

.content {
  margin: 70px 0 0 0;
  min-height: 500px;
}

.footer {
  padding: px;
  background-color: #eee;
  text-align: center;
}

/* Mobile Styles */
@media only screen and (max-width: 480px) {
  body {
    margin: 15px 40px;
  }
  #header-items {
    font-size: 14px;
    width: 75%;
  }
  .footer p{
    font-size: 14px;
  }
  .content {
    margin: 30px 0 0 0;
    min-height: 500px;
  }
}

/* Tablet Styles */
@media only screen and (min-width: 481px) and (max-width: 960px) {
  h1 {
    font-size: 80px;
  }
  #header-items {
    font-size: 20px;
    width: 75%;
  }
  .content {
    margin: 40px 0 0 0;
    min-height: 500px;
  }
}


</style>
