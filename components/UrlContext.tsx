import { createContext, useContext } from 'react'

type UrlContext = {
  urls: {
    original_url: string
    short_url: string
  }[]
  setUrls: (
    url: {
      original_url: string
      short_url: string
    }[]
  ) => void
}

export const UrlContext = createContext<UrlContext>({} as UrlContext)

export const useUrl = () => {
  return useContext(UrlContext)
}
