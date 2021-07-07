<template>
  <div id="app">
    <token></token>
  </div>
</template>

<script>
import Token from './components/Token'

export default {
  components: {
    Token,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px auto;
  max-width: 500px;
}
</style>
