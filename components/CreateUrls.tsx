import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import * as urlService from '../services/urlService'
import { useUrl } from './UrlContext'
import { nanoid } from 'nanoid'

const CreateUrls = () => {
  const [url, setUrl] = useState({
    url: '',
    surl: '',
  })
  const { urls, setUrls } = useUrl()
  const handleChange = (e: Event | any) => {
    e = e || window.event
    e.preventDefault()
    const { name, value } = e.target
    setUrl({ ...url, [name]: value })
    return handleChange
  }

  const handleSubmit = async (e: Event | any) => {
    e = e || window.event
    e.preventDefault()
    const data = {
      url: url.url,
      surl: url.surl,
    }
    if (data.surl === '') {
      data.surl = nanoid(10)
    }
    const sUrl = urlService.createUrl(data)
    const newUrl = {
      original_url: data.url,
      short_url: data.surl,
    }
    const newUrls = [newUrl, ...urls]
    try {
      await sUrl
      setUrls(newUrls)
      toast.promise(sUrl, {
        loading: 'Loading',
        success: 'Url shortened successfully',
        error: 'Unable to shorten url',
      })

      setUrl({
        url: '',
        surl: '',
      })
    } catch (ex: any) {
      toast.error(ex.response.data)
    }
  }

  return (
    <section className=" mt-2 flex w-full flex-row items-center  px-2 py-2 md:px-24 xl:px-20">
      <form
        onSubmit={handleSubmit}
        className="flex w-full  flex-col items-center gap-6 rounded-xl md:bg-zinc-50 p-6 md:shadow-[0_35px_60px_-15px]  md:shadow-[#FFBA49] md:dark:bg-zinc-900 md:dark:shadow-[#EF5B5B]  lg:mx-16 lg:h-20 md:flex-row lg:justify-between lg:gap-4 lg:px-4"
      >
        <input
          className="w-full appearance-none rounded-lg bg-zinc-50  py-3 px-4 leading-tight text-zinc-900  outline-none transition-all duration-500 focus:bg-zinc-100 dark:bg-zinc-900   dark:text-zinc-200 dark:focus:bg-zinc-800  "
          id="url"
          type="url"
          value={url.url}
          onChange={handleChange}
          title="Enter a valid URL"
          name="url"
          placeholder="URL"
        />
        <input
          className="w-full appearance-none rounded-lg  bg-zinc-50  py-3 px-4 leading-tight text-zinc-900  outline-none transition-all duration-500 focus:bg-zinc-100 dark:bg-zinc-900   dark:text-zinc-200 dark:focus:bg-zinc-800  "
          id="surl"
          value={url.surl}
          onChange={handleChange}
          type="text"
          title="Short URL should contain letters only special charcters are not allowed and should be at least 5 characters long"
          pattern="[a-zA-Z0-9]*"
          name="surl"
          placeholder="Short URL (Autogenerated)"
        />
        <button className="flex items-center w-full md:w-auto justify-center rounded-lg bg-zinc-200  px-5 py-2 text-2xl   backdrop-blur-2xl transition-all  duration-500 hover:bg-opacity-80 active:scale-75 dark:bg-zinc-900   dark:backdrop-blur-2xl dark:hover:bg-opacity-80">
          <p className="animate-gradient-x  bg-gradient-to-r text-[#FFBA49]  dark:text-[#EF5B5B]  ">
            Shorten
          </p>
        </button>
      </form>
      <Toaster position="bottom-right" reverseOrder={false} />
    </section>
  )
}

export default CreateUrls
