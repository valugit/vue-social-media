<template>
    <div>
      <h2>Your Personal Space</h2>
      <span>Name: {{name}}</span>
      <span>Username: {{username}}</span>
    </div>
</template>

<script>
import { api, loadAuthorizationHeader } from '../utils/api'

export default {
  name: 'Profile',
  data() {
    return {
      name: '',
      username: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      api.get('/user/me', loadAuthorizationHeader())
      .then(res => {
        console.log(res)
        this.name = res.data.name
        this.username = res.data.username
      })
      .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped lang="scss">
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>