import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import * as urlService from '../services/urlService'
import { nanoid } from 'nanoid'
import Link from 'next/link'

type Props = {
  originalUrl: string
  shortUrl: string
  id: string
}

const UpdateUrl = (props: Props) => {
  const [url, setUrl] = useState({
    url: props.originalUrl,
    surl: props.shortUrl,
  })
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
      id: props.id,
      url: url.url,
      surl: url.surl,
    }
    if (data.surl === '') {
      data.surl = nanoid(10)
    }

    const sUrl = urlService.updateUrl(data)
    try {
      await sUrl
      toast.promise(sUrl, {
        loading: 'Loading',
        success: 'Url updated successfully',
        error: 'Unable to update url',
      })
    } catch (ex: any) {
      toast.error(ex.response.data)
    }
  }

  return (
    <section className=" flex h-screen w-full flex-col items-center justify-center  px-2 py-2 md:px-24 xl:px-20">
      <form
        onSubmit={handleSubmit}
        className="flex w-full  flex-col items-center gap-6 rounded-xl bg-zinc-100 p-6 shadow-[0_35px_60px_-15px]  shadow-[#FFBA49] dark:bg-zinc-900 dark:shadow-[#EF5B5B]  lg:mx-16 lg:h-20 lg:flex-row lg:justify-between lg:gap-4 lg:px-4"
      >
        <input
          className="w-full appearance-none rounded-lg bg-gray-400 bg-opacity-40 py-3 px-4 leading-tight text-gray-900  outline-none transition-all duration-500 focus:bg-opacity-20 dark:bg-zinc-700  dark:bg-opacity-40 dark:text-gray-200 dark:focus:bg-opacity-100  "
          id="url"
          type="url"
          value={url.url}
          onChange={handleChange}
          title="Enter a valid URL"
          name="url"
          placeholder="URL"
        />
        <input
          className="w-full appearance-none rounded-lg  bg-gray-400 bg-opacity-40 py-3 px-4 leading-tight text-gray-900  outline-none transition-all duration-500 focus:bg-opacity-20 dark:bg-zinc-700  dark:bg-opacity-40 dark:text-gray-200 dark:focus:bg-opacity-100  "
          id="surl"
          value={url.surl}
          onChange={handleChange}
          type="text"
          name="surl"
          placeholder="Short URL (Autogenerated)"
        />
        <button className="flex items-center justify-center rounded-lg bg-gray-300 bg-opacity-20 px-5 py-2 text-2xl   backdrop-blur-2xl transition-all  duration-500 hover:bg-opacity-100 active:scale-75 dark:bg-zinc-700  dark:bg-opacity-20 dark:backdrop-blur-2xl dark:hover:bg-opacity-100">
          <p className=" text-[#FFBA49]  dark:text-[#EF5B5B]  ">Update</p>
        </button>
      </form>
      <div className="mt-16 flex flex-row items-center justify-center">
        <Link href="/" passHref>
          <button className="flex items-center justify-center rounded-lg bg-gray-300 bg-opacity-20 px-5 py-2 text-2xl   backdrop-blur-2xl transition-all  duration-500 hover:bg-opacity-100 active:scale-75 dark:bg-zinc-700  dark:bg-opacity-20 dark:backdrop-blur-2xl dark:hover:bg-opacity-100">
            <p className="text-[#FFBA49]  dark:text-[#EF5B5B] "> Home</p>
          </button>
        </Link>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </section>
  )
}

export default UpdateUrl
