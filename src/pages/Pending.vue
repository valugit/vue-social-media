<template>
  <div id="pending">
    <h2>Pending Invitations</h2>
    <div v-if="invitations.length">
      <div class="invite" v-for="(invite, i) in invitations" :key="i">
        <span>{{invite.username}} {{invite.name}}</span>
        <div>
          <button @click="acceptInvite(invite.id)">
            Accept
          </button>
          <button @click="rejectInvite(invite.id)">
            Reject
          </button>
          <router-link :to="{ name: 'user', params: { id: invite.id } }">Show User Profile</router-link>
        </div>
      </div>
    </div>
    <div v-else>Sadly, no one wants to be your friend...</div>
  </div>
</template>

<script>
import { api, loadAuthorizationHeader } from '../utils/api'

export default {
  name: 'Pending',
  data() {
    return {
      invitations: [],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      api.get('/friendship/request', loadAuthorizationHeader())
        .then(res => this.invitations = res.data)
        .catch(err => console.log(err))
    },
    acceptInvite(id) {
      api.get(`/friendship/request/${id}/accept`, loadAuthorizationHeader())
        .then(() => this.invitations = this.invitations.filter(user => !(user.id === id)))
        .catch(err => console.log(err))
    },
    rejectInvite(id) {
      api.get(`/friendship/request/${id}/reject`, loadAuthorizationHeader())
        .then(() => this.invitations = this.invitations.filter(user => !(user.id === id)))
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped lang="scss">
#pending {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
  }
}

.invite {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 1px solid #52dccd;
  padding: 10px;
  margin: 5px;

  button, a {
    text-decoration: none;
    border: none;
    background: none;
    color: #52dccd;
    cursor: pointer;

    &:hover {
      color: #dcdcdc;
      text-decoration: underline;
    }
  }
}
</style>