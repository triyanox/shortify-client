import Toggle from './Toggle'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import cn from 'classnames'
import { useUser } from '../components/userContext'
import { Fragment } from 'react'

interface NavItems {
  href: string
  text: string
}

function NavItem({ href, text }: NavItems) {
  const router = useRouter()
  const isActive = router.asPath === href

  return (
    <NextLink href={href}>
      <a
        className={cn(
          isActive
            ? 'font-semibold text-[#FFBA49] dark:text-[#EF5B5B]'
            : 'font-normal text-black dark:text-white',
          ' inline-block rounded-lg p-1 transition-all hover:bg-gray-200 dark:hover:bg-zinc-800 sm:px-3 sm:py-2'
        )}
      >
        <span className="capsize">{text}</span>
      </a>
    </NextLink>
  )
}

function HomeLink({ href, text }: NavItems) {
  return (
    <NextLink href={href}>
      <a className="inline-block rounded-lg p-1 font-semibold text-[#FFBA49] transition-all hover:bg-gray-200 dark:text-[#EF5B5B] dark:hover:bg-zinc-800 sm:px-3 sm:py-2">
        <span className="capsize">{text}</span>
      </a>
    </NextLink>
  )
}

function Header() {
  const { email, iat, name, _id, loggedIn } = useUser()
  const handleLogOut = () => {
    localStorage.removeItem('jwt')
    window.location.reload()
  }
  return (
    <section className="fixed top-0 z-50 flex h-16 w-full items-center bg-white bg-opacity-40 py-2 px-8 backdrop-blur-xl backdrop-filter dark:bg-black dark:bg-opacity-40 md:px-24 xl:px-20">
      <nav className=" flex  w-full flex-row items-center justify-between ">
        <div className="  inline-flex  w-full text-xl ">
          <HomeLink href="/" text="Shortify" />
        </div>
        <div className="flex w-full flex-row items-center justify-end gap-4">
          {!loggedIn ? (
            <Fragment>
              <NavItem href="/signup" text="Sign Up" />
              <NavItem href="/login" text="Log In" />
            </Fragment>
          ) : (
            <button
              className="inline-block rounded-lg p-1
           font-bold text-[#FFBA49] transition-all hover:bg-gray-200 dark:text-[#EF5B5B] dark:hover:bg-zinc-800 sm:px-3 sm:py-2"
              onClick={handleLogOut}
            >
              <span className="capsize">Log Out</span>
            </button>
          )}

          <Toggle />
        </div>
      </nav>
    </section>
  )
}

export default Header
