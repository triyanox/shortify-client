import type { NextPage } from 'next'
import Layout from '../layouts/Layout'
import { useUser } from '../components/userContext'
import NothingToShow from '../components/NothingToShow'
import AccountComponent from '../components/Acount'
import UpdateUser from '../components/UserAccount'
const Account: NextPage = () => {
  const { email, iat, name, _id, loggedIn } = useUser()
  return (
    <Layout
      pageTitle={!loggedIn ? 'Nothing To show here !' : `Shortify | ${name}`}
      siteName="Shortify"
      description="URL shortener service"
      preview="home"
    >
      {!loggedIn ? (
        <NothingToShow />
      ) : (
        <>
          <AccountComponent user={{ name, email, _id, iat }} />
          <UpdateUser email={email} id={_id} name={name} />
        </>
      )}
    </Layout>
  )
}

export default Account
