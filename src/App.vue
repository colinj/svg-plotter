<template>
  <div id="app">
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
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

input,
button,
textarea,
select {
  // font: inherit;

  &:focus {
    outline: none;
  }
}

</style>
