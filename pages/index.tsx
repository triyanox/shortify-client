import type { NextPage } from 'next'
import Dashboard from '../components/Dashboard'
import Hero from '../components/Hero'
import Layout from '../layouts/Layout'
import { useUser } from '../components/userContext'
const Home: NextPage = () => {
  const { email, iat, name, _id, loggedIn } = useUser()
  return (
    <Layout
      pageTitle="Shortify"
      siteName="Shortify"
      description="URL shortener service"
      preview="home"
    >
      {!loggedIn ? <Hero /> : <Dashboard user={{ email, iat, name, _id }} />}
    </Layout>
  )
}

export default Home
