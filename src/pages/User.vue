<template>
    <div>
      <h2>{{name}} Private Space</h2>
      <span>Username: {{username}}</span>
      <div class="actions">
        <button v-if="!friend" @click="addFriend">
          Make Friend
        </button>
        <button v-if="!friend" @click="cancelFriendRequest">
          Cancel Friend Request
        </button>
        <button @click="blockUser">
          Block User
        </button>
        <button @click="unblockUser">
          Unblock User
        </button>
      </div>
    </div>
</template>

<script>
import { api, loadAuthorizationHeader } from '../utils/api'

export default {
  name: 'User',
  data() {
    return {
      id: -1,
      name: '',
      username: '',
      friend: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const id = this.$route.params.id
      api.get(`/user/${id}`, loadAuthorizationHeader())
        .then(res => {
          this.id = parseInt(res.data.id)
          this.name = res.data.name
          this.username = res.data.username
          this.friend = this.$store.getters.isFriend(res.data.id)
        })
        .catch(err => console.log(err))

    },
    addFriend() {
      api.post('/friendship/request', { requestedId: this.id }, loadAuthorizationHeader())
        .then(() => this.request = true)
        .catch(err => console.log(err))
    },
    cancelFriendRequest() {
      api.delete(`/friendship/request/${this.id}`, loadAuthorizationHeader())
        .then(() => this.request = false)
        .catch(err => console.log(err))
    },
    blockUser() {
      api.get(`/user/block/${this.id}`, loadAuthorizationHeader())
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    unblockUser() {
      api.delete(`/user/block/${this.id}`, loadAuthorizationHeader())
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped lang="scss">
.actions {
  padding: 10px;
}

button {
  margin: 10px;
  border: 1px solid #dcdcdc;
  background: none;
  padding: 10px;
  cursor: pointer;

  &:hover {
    color: #52dccd;
    border-color: #52dccd;
    text-decoration: underline;
  }
}
</style>