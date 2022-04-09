import type { NextPage } from 'next'
import Layout from '../layouts/Layout'
import NothingToShow from '../components/NothingToShow'
const Custom500: NextPage = () => {
  return (
    <Layout
      pageTitle="500"
      siteName="Shortify"
      description="URL shortener service"
      preview="Login"
    >
      <NothingToShow />
    </Layout>
  )
}

export default Custom500
