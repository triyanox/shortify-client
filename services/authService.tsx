import http from './http'
import config from '../config/config.json'

const auth = config.endpoint + '/api/auth'

export function loginUser(user: { email: string; password: string }) {
  return http.post(auth, user)
}

export function getJwt() {
  let token
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('jwt')
  }
  return token || ''
}
