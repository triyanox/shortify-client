import axios from 'axios'
import * as auth from './authService'

if (typeof window !== 'undefined') {
  axios.defaults.headers.common['x-auth-token'] = auth.getJwt()
}
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('jwt')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
}
