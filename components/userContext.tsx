import { createContext, useContext } from 'react'

export const UserContext = createContext({
  email: '',
  iat: 0,
  name: '',
  _id: '',
  loggedIn: false,
})

export const useUser = () => {
  return useContext(UserContext)
}
