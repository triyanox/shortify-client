import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { BiHide, BiShowAlt } from 'react-icons/bi'

import * as authService from '../services/authService'

const LogIn = () => {
  const [passwordShown, setPasswordShown] = useState(false)
  const [account, setAccount] = useState({
    email: '',
    password: '',
  })

  const handleDemo = async () => {
    try {
      const res = authService.loginUser({
        email: 'demo@shortify.com',
        password: 'Shortify@2022',
      })
      await res
      toast.promise(res, {
        loading: 'Loading',
        success: 'Successfully logged in , redirecting...',
        error: 'Unable to log in',
      })
      const jwt = (await res).data
      localStorage.setItem('jwt', jwt)
      window.location.href = '/'
    } catch (ex: any) {
      toast.error(ex.response.data)
    }
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
    }
    const login = authService.loginUser(data)
    try {
      const loggedIn = await login
      const jwt = loggedIn.data
      localStorage.setItem('jwt', jwt)
      toast.promise(login, {
        loading: 'Loading',
        success: 'Successfully logged in , redirecting...',
        error: 'Unable to log in',
      })
      setTimeout(() => {
        window.location.replace('/')
      }, 2000)
    } catch (ex: any) {
      toast.error(ex.response.data)
    }
  }

  return (
    <section className="mt-28 flex w-full flex-col-reverse items-center justify-center gap-y-8 px-10 md:px-24 lg:mt-0 lg:h-screen lg:flex-row xl:px-20">
      <div className="mx-8 flex w-full flex-col items-center justify-center gap-4 sm:mx-16 lg:mx-0">
        <h1 className="mb-8 animate-gradient-x bg-gradient-to-r from-[#FFBA49] to-[#EF5B5B] bg-clip-text text-4xl text-transparent">
          Log in
        </h1>
        <form
          className="flex w-full flex-col items-center justify-center gap-2"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 w-[26rem] md:w-[24rem] lg:w-[28rem]">
            <input
              className="w-full appearance-none  rounded-lg bg-gray-200 py-3 px-4 leading-tight text-gray-900  outline-none transition-all duration-500 focus:outline focus:outline-[#FFBA49] dark:bg-zinc-800 dark:text-gray-200 dark:focus:outline dark:focus:outline-[#EF5B5B]"
              id="email"
              type="email"
              name="email"
              value={account.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className=" w-[26rem] md:w-[24rem] lg:w-[28rem]">
            <input
              className="w-full appearance-none  rounded-lg bg-gray-200 py-3 px-4 leading-tight text-gray-900  outline-none transition-all duration-500 focus:outline focus:outline-[#FFBA49] dark:bg-zinc-800 dark:text-gray-200 dark:focus:outline dark:focus:outline-[#EF5B5B]"
              id="password"
              type={passwordShown ? 'text' : 'password'}
              value={account.password}
              title="Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!"
              pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
              onChange={handleChange}
              name="password"
              placeholder="Password"
            />
            <button
              onClick={togglePassword}
              className="absolute mt-1 -ml-12  text-4xl text-[#FFBA49]  transition-all duration-500 active:scale-75 dark:text-[#EF5B5B]"
            >
              {passwordShown ? <BiHide /> : <BiShowAlt />}
            </button>
          </div>

          <div className="flex w-[26rem] flex-col items-center justify-center gap-4 md:w-[24rem] lg:w-[28rem]">
            <button
              className="text-md  mt-8 w-full rounded-lg bg-[#FFBA49] p-4 py-2 text-white transition-all duration-200 ease-in hover:scale-105 active:scale-90  dark:bg-[#EF5B5B] dark:text-black md:text-lg "
              type="submit"
            >
              Log In
            </button>
          </div>
        </form>
        <div className="flex w-[26rem] flex-col items-center justify-center gap-4 md:w-[24rem] lg:w-[28rem]">
          <button
            onClick={handleDemo}
            className="text-md w-full rounded-lg border border-[#FFBA49] p-4 py-2 font-bold text-[#FFBA49] transition-all duration-200 ease-in hover:scale-105 active:scale-90  dark:border-[#EF5B5B] dark:text-[#EF5B5B] md:text-lg "
          >
            Demo user
          </button>
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </section>
  )
}

export default LogIn
