<template>
    <div>
      <h2>Login</h2>
      <form>
        <input :class="{ 'error': username.error }" v-model="username.value" type="text" placeholder="Username" required>
        <input :class="{ 'error': password.error }" v-model="password.value" type="password" placeholder="Password" required>
        <button type="button" @click="login">
          sign-in
        </button>
      </form>
      <span>
        Don't have an account yet?&nbsp;
        <router-link :to="{ name: 'register' }">Create one now!</router-link>
      </span>
    </div>
</template>

<script>
import { matches, isLength } from 'validator'

export default {
  name: 'Login',
  data() {
    return {
      username: {
        value: '',
        error: false
      },
      password: {
        value: '',
        error: false
      }
    }
  },
  methods: {
    login() {
      this.username.error = !matches(this.username.value, /^[a-z]+(([',. -][a-z ])?[a-z]*)*$/i)
      this.password.error = !isLength(this.password.value, { min: 8 })

      if (!this.username.error && !this.password.error) {
        let obj = {
          username: this.username.value,
          password: this.password.value
        }
        this.$store.dispatch('login', obj)
          .then(() => this.$router.push({ name: 'home' }))
          .catch(err => console.log(err))
      }
    }
  },
}
</script>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;

  & > * {
    margin-bottom: 10px;
  }

  input {
    background: none;
    border: none;
    border-bottom: 1px solid #52dccd;
    padding: 10px;
    outline: none;
  }

  button {
    border: 1px solid #52dccd;
    color: #52dccd;
    padding: 10px;
    background: none;
    cursor: pointer;

    &:hover {
      border-color: #dcdcdc;
      text-decoration: underline;
      color: #dcdcdc;
    }
  }

  .error {
    border-bottom-color: red;
  }
}

a {
  text-decoration: none;
  color: #52dccd;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: #dcdcdc;
  }
}
</style>