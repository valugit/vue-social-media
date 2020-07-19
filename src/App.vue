<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    Header
  },
}
</script>

<style lang="scss">
html, body {
  margin: 0px;
  padding: 0px;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #dcdcdc;
  background-color: #252523;
  width: 100vw;
  height: 100vh;
}
main {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #dcdcdc;

  &:focus {
    outline: none;
  }
}
</style>
