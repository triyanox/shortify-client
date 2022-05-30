import User from './User'
import CreateUrls from './CreateUrls'
import UrlsCreated from './UrlsCreated'
import * as urlService from '../services/urlService'
import { useEffect, useState } from 'react'
import { UrlContext } from './UrlContext'
import toast, { Toaster } from 'react-hot-toast'
type Props = {
  user: { email: string; iat: number; name: string; _id: string }
}

const Dashboard = (props: Props) => {
  useEffect(() => {
    getAllUrls()
  }, [])

  async function getAllUrls() {
    const urls = urlService.getAllUrls()
    try {
      const fetched = await urls
      const myUrls = fetched.data
        .map((url: any) => {
          return { original_url: url.original_url, short_url: url.short_url }
        })
        .reverse()
      setUrls(myUrls)
      toast.success('Urls loaded successfully')
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
        <Toaster
          toastOptions={{
            position: 'bottom-right',
          }}
        />
      </section>
    </UrlContext.Provider>
  )
}

export default Dashboard
