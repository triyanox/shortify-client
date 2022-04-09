import http from './http'
import config from '../config/config.json'

const register = config.endpoint + '/api/users'
const me = config.endpoint + '/api/users/me'
const update = config.endpoint + '/api/users/'
const dl = config.endpoint + '/api/users/'

export function registerUser(user: {
  name: string
  email: string
  password: string
}) {
  return http.post(register, user)
}

export function getMe() {
  return http.get(me)
}

export function updateUser(user: {
  name: string
  email: string
  password: string
  _id: string
}) {
  return http.put(update, user)
}

export function deleteUser(id: any) {
  return http.delete(dl, id)
}
