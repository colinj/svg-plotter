<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Plotter />
  </div>
</template>

<script>
import Plotter from './components/Plotter.vue'

export default {
  name: 'App',
  components: {
    Plotter
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
