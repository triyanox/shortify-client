import type { NextPage } from 'next'
import SignUp from '../components/SignUp'
import Layout from '../layouts/Layout'

const Signup: NextPage = () => {
  return (
    <Layout
      pageTitle="Shortify - Sign Up"
      siteName="Shortify"
      description="URL shortener service"
      preview="home"
    >
      <SignUp />
    </Layout>
  )
}

export default Signup
