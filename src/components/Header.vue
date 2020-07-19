<template>
  <header>
    <router-link :to="{ name: 'home' }">
      <h1>VSM</h1>
    </router-link>

    <div class="navbar" v-if="isLoggedIn">
      <router-link :to="{ name: 'pending' }">Pending</router-link>
      <router-link :to="{ name: 'profile' }">Profile</router-link>
      <button @click="logout">Logout</button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed : {
    isLoggedIn() { return this.$store.getters.isLoggedIn }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => this.$router.push('/login'))
    }
  }
}
</script>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #52dccd;
  height: 8vh;
}

h1 {
  margin: 0;
}

.navbar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
button, a {
  text-decoration: none;
  color: #52dccd;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  margin: 10px;
  font-size: 16px;

  h1 {
    color: #52dccd;
  }

  &:hover {
    color: #dcdcdc;
    text-decoration: underline;

    h1 {
      color: #dcdcdc;
    }
  }
}
</style>
