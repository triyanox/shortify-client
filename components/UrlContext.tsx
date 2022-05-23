import { createContext, useContext } from 'react'

type UrlContext = {
  urls:
    | {
        original_url: string
        short_url: string
      }[]
    | null
  setUrls: (url: any) => void
}

export const UrlContext = createContext<UrlContext>({} as UrlContext)

export const useUrl = () => {
  return useContext(UrlContext)
}
