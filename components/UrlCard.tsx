import Link from 'next/link'
import { FiEdit2 } from 'react-icons/fi'
import { IoIosAnalytics } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import config from '../config/config.json'
import { FiCopy } from 'react-icons/fi'
import { BsFillCheckCircleFill } from 'react-icons/bs'
const endpoints = config.endpoint
import * as urlService from '../services/urlService'
import toast, { Toaster } from 'react-hot-toast'
import { useUrl } from './UrlContext'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

type Props = {
  originalUrl: string
  shortUrl: string
}

const UrlCard = (props: Props) => {
  const [data, setData] = useState({
    _id: '',
    user_id: '',
    shortUrl: '',
    responseTime: 0,
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    views: 0,
    method: '',
  })
  let [isOpen, setIsOpen] = useState(false)
  const fetchanalytics = async () => {
    let result
    const an = urlService.getAnalytics(props.shortUrl)
    try {
      result = await an
      setData(result.data)
      setIsOpen(true)
    } catch (ex: any) {
      toast.error(ex.response.data)
      setIsOpen(false)
    }
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    fetchanalytics()
  }
  const [copied, setCopied] = useState(false)
  const { urls, setUrls } = useUrl()
  const copyToClipboard = (e: any) => {
    const url = endpoints + `/api/url/${props.shortUrl}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const removeItem = (
    arr: {
      original_url: string
      short_url: string
    }[],
    value: string
  ) => {
    return arr.filter((obj: any) => obj.short_url !== value)
  }

  const deleteUrl = async () => {
    let short_url = props.shortUrl
    const remove = urlService.deleteUrl(short_url)
    try {
      if (urls.length !== 0) {
        let updatedUrls = removeItem(urls, short_url)
        setUrls(updatedUrls)
      }
      await remove
      toast.promise(remove, {
        loading: 'Loading',
        success: 'Successfully removed',
        error: 'Failed to remove',
      })
    } catch (ex: any) {
      setUrls(urls)
      if (ex.response.status === 404) {
        toast.error('Url not found try again')
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    }
  }

  return (
    <div className="flex w-full flex-row items-center justify-between rounded-lg p-2 px-2">
      <div>
        <Link href={endpoints + `/api/url/${props.shortUrl}`} passHref>
          <a
            target={'_blank'}
            className="text-xl text-[#FFBA49]  dark:text-[#EF5B5B]"
          >
            {props.originalUrl}
          </a>
        </Link>
      </div>
      <div className="flex flex-row items-center justify-center gap-2 text-2xl text-[#FFBA49]   dark:text-[#EF5B5B]">
        <button
          className="group transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={copyToClipboard}
        >
          {!copied ? (
            <FiCopy />
          ) : (
            <BsFillCheckCircleFill className="text-green-400 " />
          )}
          <span
            className="absolute -right-5 mt-2  w-auto min-w-max origin-top scale-0 rounded-md
                    bg-[#FFBA49] p-2  px-3 text-sm font-semibold 
    text-white shadow-xl 
    transition-all duration-100 group-hover:scale-100 dark:bg-[#EF5B5B] dark:text-black"
          >
            {!copied ? 'Copy' : 'Copied'}
          </span>
        </button>
        <Link href={`/edit/${props.shortUrl}`}>
          <a className="group  transition-all duration-300 hover:scale-110 active:scale-95">
            <FiEdit2 />
            <span
              className="absolute -right-4 mt-2   w-auto min-w-max origin-top scale-0 rounded-md
                    bg-[#FFBA49] p-2  px-3 text-sm font-semibold 
    text-white shadow-xl 
    transition-all duration-100 group-hover:scale-100 dark:bg-[#EF5B5B] dark:text-black"
            >
              Edit
            </span>
          </a>
        </Link>

        <button
          onClick={openModal}
          className="group transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <IoIosAnalytics />
          <span
            className="absolute  -right-8 mt-2  w-auto min-w-max origin-top scale-0 rounded-md
                    bg-[#FFBA49] p-2  px-3 text-sm font-semibold 
    text-white shadow-xl 
    transition-all duration-100 group-hover:scale-100 dark:bg-[#EF5B5B] dark:text-black"
          >
            Analytics
          </span>
        </button>
        <button
          className="group transition-all duration-300 hover:scale-110 active:scale-95"
          onClick={deleteUrl}
        >
          <MdDelete />
          <span
            className="absolute -right-6 mt-2   w-auto min-w-max origin-top scale-0 rounded-md
                    bg-[#FFBA49] p-2  px-3 text-sm font-semibold 
    text-white shadow-xl 
    transition-all duration-100 group-hover:scale-100 dark:bg-[#EF5B5B] dark:text-black"
          >
            Delete
          </span>
        </button>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 backdrop-blur-xl" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-black">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-extrabold leading-6 text-[#FFBA49]   dark:text-[#EF5B5B]"
                >
                  Original URL : {data ? props.originalUrl : 'Loading'}
                </Dialog.Title>
                {data && (
                  <div className="text-md mt-4 flex flex-col items-start  justify-center gap-1 md:text-lg">
                    <div>
                      <span className="font-medium text-[#FFBA49]   dark:text-[#EF5B5B]">
                        Short Url :
                      </span>{' '}
                      {data.shortUrl}
                    </div>
                    <div>
                      <span className="font-medium text-[#FFBA49]   dark:text-[#EF5B5B]">
                        Last time clicked :
                      </span>{' '}
                      {new Date(
                        data.year,
                        data.month,
                        data.day,
                        data.hour,
                        data.minute
                      ).toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium text-[#FFBA49]   dark:text-[#EF5B5B]">
                        Total clicks :
                      </span>{' '}
                      {data.views}
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <button
                    type="button"
                    className="text-md trasmition-all inline-flex justify-center rounded-lg  bg-[#FFBA49] px-12 py-2 text-sm font-medium text-black duration-300 hover:bg-[#febf5a]   active:scale-95 dark:bg-[#EF5B5B] dark:text-white dark:hover:bg-[#f95b5b] md:text-lg"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default UrlCard
