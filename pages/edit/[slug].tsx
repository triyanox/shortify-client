import Layout from '../../layouts/Layout'
import * as urlService from '../../services/urlService'
import UpdateUrl from '../../components/UpdateUrl'
import NothingToShow from '../../components/NothingToShow'
import { useUser } from '../../components/userContext'

export const getServerSideProps = async ({ query }: any) => {
  const { slug } = query
  const url = await urlService.getUrl(slug)
  if (url.data.length === 0) {
    return {
      props: {
        url: {
          original_url: '',
          short_url: '',
        },
      },
    }
  }
  return {
    props: {
      url: url.data,
    },
  }
}

type Props = {
  url: {
    _id: string
    user_id: string
    original_url: string
    short_url: string
  }
}

const editUrl: React.FC<Props> = (props: Props) => {
  const { loggedIn } = useUser()
  return (
    <Layout
      pageTitle={
        !loggedIn
          ? 'Nothing To show here !'
          : `Shortify | ${props.url.short_url}`
      }
      siteName="Shortify"
      description="URL shortener service"
      preview="home"
    >
      {props.url.original_url === '' || !loggedIn ? (
        <NothingToShow />
      ) : (
        <UpdateUrl
          id={props.url._id}
          originalUrl={props.url.original_url}
          shortUrl={props.url.short_url}
        />
      )}
    </Layout>
  )
}

export default editUrl
