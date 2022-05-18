import toast, { Toaster } from 'react-hot-toast'
import { BiHide, BiShowAlt } from 'react-icons/bi'
import * as userService from '../services/userService'
import light from '../assets/account-light.svg'
import dark from '../assets/account-dark.svg'
import pip from '../assets/account.svg'
import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

type Props = {
  id: string
  name: string
  email: string
}

const UpdateUser = (props: Props) => {
  const [passwordShown, setPasswordShown] = useState(false)

  async function deleteUser() {
    try {
      closeModal()
      await userService.deleteUser(props.id)
      toast.success('User deleted successfully')
      localStorage.removeItem('jwt')
      setTimeout(() => {
        window.location.href = '/'
      }, 2000)
    } catch (ex: any) {
      toast.error(ex.response.data)
    }
  }

  const [account, setAccount] = useState({
    email: props.email,
    password: '',
    name: props.name,
  })
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const togglePassword = (e: Event | any) => {
    setPasswordShown(!passwordShown)
    e = e || window.event
    e.preventDefault()
  }

  const handleChange = (e: Event | any) => {
    e = e || window.event
    e.preventDefault()
    const { name, value } = e.target
    setAccount({ ...account, [name]: value })
    return handleChange
  }

  const handleSubmit = async (e: Event | any) => {
    e = e || window.event
    e.preventDefault()
    const data = {
      email: account.email,
      password: account.password,
      name: account.name,
      _id: props.id,
    }
    try {
      const updated = await userService.updateUser(data)
      localStorage.setItem('jwt', updated.headers['x-auth-token'])
      toast.success('User updated successfully ! Redirecting...')
      setTimeout(() => {
        window.location.replace('/')
      }, 2000)
    } catch (ex: any) {
      toast.error(ex.response.data)
    }
  }

  return (
    <section className="mt-8 mb-16 flex w-full flex-col items-center justify-center gap-8 px-10 md:px-24 xl:mt-12  xl:flex-row xl:items-start xl:px-20">
      <div className="mx-8 flex w-full flex-col items-center justify-center gap-4 sm:mx-16 lg:mx-0">
        <h1 className="mb-8 w-5/6 animate-gradient-x bg-gradient-to-r from-[#FFBA49] to-[#EF5B5B] bg-clip-text text-left text-3xl text-transparent md:w-[24rem] lg:w-[28rem]">
          Update Your Account
        </h1>
        <form
          className="flex w-full flex-col items-center justify-center gap-2"
          onSubmit={handleSubmit}
        >
          <div className="mb-4  w-5/6 md:w-[24rem] lg:w-[28rem]">
            <input
              className="w-full appearance-none rounded-lg bg-gray-200  py-3 px-4 leading-tight text-gray-900 shadow outline-none transition-all duration-500 focus:outline focus:outline-[#FFBA49] dark:bg-zinc-800 dark:text-gray-200 dark:focus:outline dark:focus:outline-[#EF5B5B]"
              id="username"
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>
          <div className="mb-4 w-5/6 md:w-[24rem] lg:w-[28rem]">
            <input
              className="w-full appearance-none rounded-lg bg-gray-200 py-3 px-4 leading-tight text-gray-900 shadow outline-none transition-all duration-500 focus:outline focus:outline-[#FFBA49] dark:bg-zinc-800 dark:text-gray-200 dark:focus:outline dark:focus:outline-[#EF5B5B]"
              id="email"
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className=" w-5/6 md:w-[24rem] lg:w-[28rem]">
            <input
              className="relative w-full appearance-none rounded-lg bg-gray-200  py-3 px-4 leading-tight text-gray-900 shadow outline-none transition-all duration-500 focus:outline focus:outline-[#FFBA49] dark:bg-zinc-800 dark:text-gray-200 dark:focus:outline dark:focus:outline-[#EF5B5B]"
              id="password"
              onChange={handleChange}
              name="password"
              title="Password should be at least 8 characters and include at least 1 letter, 1 number and 1 special character!"
              pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,256}$"
              type={passwordShown ? 'text' : 'password'}
              placeholder="Password"
              required
            />
            <button
              onClick={togglePassword}
              className="absolute mt-1 -ml-12
              text-4xl text-[#FFBA49]  transition-all duration-500 active:scale-75 dark:text-[#EF5B5B] "
            >
              {passwordShown ? <BiHide /> : <BiShowAlt />}
            </button>
          </div>

          <div className="flex w-5/6 flex-col items-center justify-center gap-4 md:w-[24rem] lg:w-[28rem]">
            <button
              className="text-md  mt-8 w-full rounded-lg bg-[#FFBA49] p-4 py-2 text-white transition-all duration-200 ease-in hover:scale-105 active:scale-90  dark:bg-[#EF5B5B] dark:text-black md:text-lg "
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
      <div className="mx-8 flex w-full flex-col items-center justify-center gap-4 sm:mx-16 lg:mx-0">
        <h1 className="mb-8 w-5/6 animate-gradient-x bg-gradient-to-r from-[#FFBA49] to-[#EF5B5B] bg-clip-text text-left text-3xl text-transparent md:w-[24rem] lg:w-[28rem]">
          Delete Your Account
        </h1>

        <button
          onClick={openModal}
          className="text-md w-5/6
rounded-lg bg-red-700 p-4 py-2 text-white transition-all duration-200 ease-in hover:scale-105 active:scale-90 dark:bg-red-600 dark:text-black  md:w-[24rem] md:text-lg lg:w-[28rem] "
        >
          Delete
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
                  className="text-lg font-extrabold leading-6 text-red-600   dark:text-red-700"
                >
                  Delete Account
                </Dialog.Title>

                <div className="md:text-md mt-4 flex flex-col items-start  justify-center gap-1 text-sm">
                  Make sure you want to delete your account.
                  <br />
                  Make in mind that you will not be able to recover your
                  account.
                  <br />
                  All your data will be permanently deleted including your short
                  links.
                  <br />
                </div>

                <div className="mt-8 flex items-start justify-start gap-2">
                  <button
                    type="button"
                    className="text-md trasmition-all inline-flex justify-center rounded-lg  bg-[#FFBA49] px-12 py-2 text-sm font-medium text-black duration-300 hover:bg-[#febf5a]   active:scale-95 dark:bg-[#EF5B5B] dark:text-white dark:hover:bg-[#f95b5b] md:text-lg"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="text-md trasmition-all inline-flex justify-center rounded-lg  bg-red-500 px-12 py-2 text-sm font-medium text-black duration-300 hover:bg-red-700   active:scale-95 dark:bg-red-700 dark:text-white dark:hover:bg-red-500 md:text-lg"
                    onClick={deleteUser}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </section>
  )
}

export default UpdateUser
