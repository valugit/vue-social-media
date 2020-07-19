import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Profile from '../pages/Profile.vue'
import User from '../pages/User.vue'
import Pending from '../pages/Pending.vue'
import NotFound from '../pages/errors/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/user/:id',
    name: 'user',
    component: User,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/pending',
    name: 'pending',
    component: Pending,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  }
  else next()
})

export default router