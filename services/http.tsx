import axios from 'axios'
import * as auth from './authService'

if (typeof window !== 'undefined') {
  axios.defaults.headers.common['x-auth-token'] = auth.getJwt()
}
axios.interceptors.response.use(undefined, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  if (!expectedError) {
    if (typeof window !== 'undefined') {
      window.location.href = '/error'
    }
  }
  return Promise.reject(error)
})

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
}
