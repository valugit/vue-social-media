import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://212.47.241.143:5000/',
  timeOut: 5000,
  headers: { Accept: 'application/json' }
})

export const loadAuthorizationHeader = () => ({ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })