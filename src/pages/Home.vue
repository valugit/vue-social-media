<template>
    <div id="home">
      <h2>Welcome to Valu Social Medial</h2>
      <div>
        <div class="friends">
          <h3>Friends</h3>
          <div v-if="friends.length">
            <div class="user" v-for="(friend, i) in friends" :key="i">
              <span>{{friend.name}}</span>
              <router-link :to="{ name: 'user', params: { id: friend.id } }">Show User Profile</router-link>
            </div>
          </div>
          <div v-else>Sadly, you don't have any friends yet...</div>
        </div>
        <div class="mayKnow">
          <h3>Other Users you may know</h3>
          <div v-if="others.length">
            <div class="user" v-for="(user, i) in others" :key="i">
              <span>{{user.username}}</span>
              <router-link :to="{ name: 'user', params: { id: user.id } }">Show User Profile</router-link>
            </div>
          </div>
          <div v-else>We sadly didn't found any other user...</div>
        </div>
      </div>
    </div>
</template>

<script>
import { api, loadAuthorizationHeader } from '../utils/api'

export default {
  name: 'Home',
  data() {
    return {
      friends: [],
      others: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$store.dispatch('getAllFriends')
        .then(() => {
          this.friends = this.$store.getters.friends
          api.get('/user', loadAuthorizationHeader())
          .then(res => {
            this.others = res.data.filter(user => !this.$store.getters.isFriend(user.id))
          })
          .catch(err => console.log(err))  
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped lang="scss">
#home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #252523;
  padding: 10px;

  & > div {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}

.friends,
.mayKnow {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #52dccd;
    width: 85%;
    padding: 10px;
  }
}

.user {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: 1px solid #52dccd;
  padding: 10px;
  margin: 5px;

  a { 
    text-decoration: none;
    color: #52dccd;
    cursor: pointer;

    &:hover {
      color: #dcdcdc;
      text-decoration: underline;
    }
  }
}
</style>