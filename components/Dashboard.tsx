import User from './User'
import CreateUrls from './CreateUrls'
import UrlsCreated from './UrlsCreated'
import * as urlService from '../services/urlService'
import { useEffect, useState } from 'react'
import { UrlContext } from './UrlContext'
type Props = {
  user: { email: string; iat: number; name: string; _id: string }
}

const Dashboard = (props: Props) => {
  useEffect(() => {
    getAllUrls()
  }, [])

  async function getAllUrls() {
    try {
      const urls = await urlService.getAllUrls()

      const myUrls = urls.data
        .map((url: any) => {
          return { original_url: url.original_url, short_url: url.short_url }
        })
        .reverse()
      setUrls(myUrls)
    } catch {
      setUrls([
        {
          original_url: '',
          short_url: '',
        },
      ])
    }
  }

  const [urls, setUrls] = useState([
    {
      original_url: '',
      short_url: '',
    },
  ])

  return (
    <UrlContext.Provider value={{ urls, setUrls }}>
      <section>
        <User name={props.user.name} email={props.user.email} />
        <CreateUrls />
        <UrlsCreated />
      </section>
    </UrlContext.Provider>
  )
}

export default Dashboard
