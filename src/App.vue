<template>
  <div id="app">
    <token/>
    <contract/>
  </div>
</template>

<script>
import Contract from './components/Contract'
import Token from './components/Token'

export default {
  components: {
    Contract,
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
