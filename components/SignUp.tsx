import Link from 'next/link'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { BiHide, BiShowAlt } from 'react-icons/bi'
import * as userService from '../services/userService'
const SignUp = () => {
  const [passwordShown, setPasswordShown] = useState(false)
  const [account, setAccount] = useState({
    email: '',
    password: '',
    name: '',
  })
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
    }
    const register = userService.registerUser(data)
    try {
       toast.promise(register, {
        loading: 'Loading',
        success: 'Successfully registered , redirecting...',
        error: 'Unable to register',
      })
      const registered = await register
      localStorage.setItem('jwt', registered.headers['x-auth-token'])
     
      setTimeout(() => {
        window.location.replace('/')
      }, 2000)
    } catch (ex: any) {
      if (ex.response && ex.response.status === 400) {
        toast.error(ex.response.data)
      }
    }
  }

  return (
    <section className="mt-28 flex w-full flex-col-reverse items-center justify-center gap-y-8 px-10 md:px-24 lg:mt-0 lg:h-screen lg:flex-row xl:px-20">
      <div className="mx-8 flex w-full flex-col items-center justify-center gap-4 sm:mx-16 lg:mx-0">
        <h1 className="mb-8 animate-gradient-x bg-gradient-to-r from-[#FFBA49] to-[#EF5B5B] bg-clip-text text-4xl text-transparent">
          Sign up
        </h1>
        <form
          className="flex w-full flex-col items-center justify-center gap-2"
          onSubmit={handleSubmit}
        >
          <div className="mb-4  w-5/6 md:w-[24rem] lg:w-[28rem]">
            <input
              className="w-full appearance-none rounded-lg bg-gray-200  py-3 px-4 leading-tight text-gray-900  outline-none transition-all duration-500 focus:outline focus:outline-[#FFBA49] dark:bg-zinc-800 dark:text-gray-200 dark:focus:outline dark:focus:outline-[#EF5B5B]"
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
              className="w-full appearance-none rounded-lg bg-gray-200 py-3 px-4 leading-tight text-gray-900  outline-none transition-all duration-500 focus:outline focus:outline-[#FFBA49] dark:bg-zinc-800 dark:text-gray-200 dark:focus:outline dark:focus:outline-[#EF5B5B]"
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
              className="relative w-full appearance-none rounded-lg bg-gray-200  py-3 px-4 leading-tight text-gray-900  outline-none transition-all duration-500 focus:outline focus:outline-[#FFBA49] dark:bg-zinc-800 dark:text-gray-200 dark:focus:outline dark:focus:outline-[#EF5B5B]"
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
              Sign Up
            </button>
            <Link href="/login" passHref>
              <a className="text-md inline-block align-baseline font-bold text-[#FFBA49] dark:text-[#EF5B5B] md:text-lg">
                Already have an account?
              </a>
            </Link>
          </div>
        </form>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </section>
  )
}

export default SignUp
