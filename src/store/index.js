import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { api, loadAuthorizationHeader } from '../utils/api'

Vue.use(Vuex)

const state = {
  token: window.localStorage.getItem('token') || '',
  user: {},
  friends: []
}

const getters = {
  isLoggedIn: state => !!state.token,
  user: state => state.user,
  friends: state => state.friends,
  isFriend: state => id => state.friends.find(friend => friend.id === id)
}

const actions = {
  login: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      api.post('/auth/login', data)
        .then(res => {
          const token = res.data.token
          const user = res.data.user
          window.localStorage.setItem('token', token, user)
          commit('LOGIN', token)
          resolve(res.data)
        })
        .catch(err => reject(err))
    })
  },
  register: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      api.post('/auth/register', data)
        .then(res => {
          const token = res.data.token
          const user = res.data.user
          window.localStorage.setItem('token', token, user)
          commit('LOGIN', token)
          resolve(res.data)
        })
        .catch(err => reject(err))
    })
  },
  logout: ({ commit }) => {
    window.localStorage.removeItem('token')
    commit('LOGOUT')
  },
  getAllFriends: ({ commit }) => {
    return new Promise((resolve, reject) => {
      api.get('/friendship', loadAuthorizationHeader())
        .then(res => {
          const friends = res.data
          commit('GET_FRIENDS', friends)
          resolve(friends)
        })
        .catch(err => reject(err))
    })
  }
}

const mutations = {
  LOGIN: (state, token, user) => {
    state.token = token
    state.user = user
  },
  LOGOUT: (state) => {
    state.token = ''
    state.user = {}
    state.friends = []
  },
  GET_FRIENDS: (state, friends) => {
    state.friends = friends
  }
}

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  plugins: [createPersistedState()]
})

export default store