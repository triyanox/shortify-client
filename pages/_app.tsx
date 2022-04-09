import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../styles/globals.css'
import NextNProgress from 'nextjs-progressbar'
import { motion } from 'framer-motion'
import { ThemeProvider } from 'next-themes'
import { UserContext } from '../components/userContext'
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(() => {
    try {
      let jwt: any = localStorage.getItem('jwt')
      const token: { email: string; iat: number; name: string; _id: string } =
        jwtDecode(jwt)
      setUser({
        email: token.email,
        iat: token.iat,
        name: token.name,
        _id: token._id,
        loggedIn: true,
      })
      if (router.pathname === '/login') {
        window.location.replace('/')
      }
      if (router.pathname === '/signup') {
        window.location.replace('/')
      }
    } catch {
      if (router.pathname === '/account') {
        window.location.replace('/login')
      }
      setUser({ ...user, loggedIn: false })
    }
  }, [])
  const [user, setUser] = useState({
    email: '',
    iat: 0,
    name: '',
    _id: '',
    loggedIn: false,
  })
  return (
    <UserContext.Provider value={user}>
      <ThemeProvider attribute="class">
        <NextNProgress height={2} color="#EB5160" />
        <motion.div
          initial="initial"
          animate="animate"
          transition={{ duration: 0.6 }}
          variants={{
            initial: {
              opacity: 0,
            },
            animate: {
              opacity: 1,
            },
          }}
        >
          <Component {...pageProps} />
        </motion.div>
      </ThemeProvider>
    </UserContext.Provider>
  )
}

export default MyApp
