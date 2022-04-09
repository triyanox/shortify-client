import type { NextPage } from 'next'
import LogIn from '../components/LogIn'
import { useUser } from '../components/userContext'
import Layout from '../layouts/Layout'

const Login: NextPage = () => {
  return (
    <Layout
      pageTitle="Shortify - Login"
      siteName="Shortify"
      description="URL shortener service"
      preview="Login"
    >
      <LogIn />
    </Layout>
  )
}

export default Login
