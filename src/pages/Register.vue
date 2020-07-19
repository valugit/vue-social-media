<template>
    <div>
      <h2>Register</h2>
      <form>
        <input :class="{ 'error': username.error }" v-model="username.value" type="text" placeholder="Username" required>
        <input :class="{ 'error': name.error }" v-model="name.value" type="text" placeholder="Name" required>
        <input :class="{ 'error': password.error }" v-model="password.value" type="password" placeholder="Password" required>
        <button type="button" @click="register">
          sign-up
        </button>
      </form>
      <span>
        Already have an account?
        <router-link :to="{ name: 'login' }">Connect now!</router-link>
      </span>
    </div>
</template>

<script>
import { matches, isLength } from 'validator'

export default {
  name: 'Register',
  data() {
    return {
      username: {
        value: '',
        error: false
      },
      name: {
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
    register() {
      this.username.error = !matches(this.username.value, /^[a-z]+(([',. -][a-z ])?[a-z]*)*$/i)
      this.name.error = !matches(this.name.value, /^[a-z]+(([',. -][a-z ])?[a-z]*)*$/i)
      this.password.error = !isLength(this.password.value, { min: 8 })

      if (!this.username.error && !this.name.error && !this.password.error) {
        let obj = { 
          username: this.username.value,
          name: this.name.value,
          password: this.password.value
        }
        this.$store.dispatch('register', obj)
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