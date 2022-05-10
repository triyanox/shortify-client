import { FaUserAstronaut } from 'react-icons/fa'
import Link from 'next/link'
const User = (props: { name: string; email: string }) => {
  return (
    <section className="mt-16 flex w-full flex-row items-center  px-8 py-2 md:px-24 xl:px-20">
      <div className="flex h-16 w-full items-center gap-4  rounded-xl  px-2 text-[#FFBA49]   dark:text-[#EF5B5B] md:px-12 ">
        <Link href="/account" passHref>
          <a className="text-end group flex flex-row justify-center gap-x-4 text-3xl  md:text-4xl">
            <FaUserAstronaut />
            <span
              className="absolute  mt-12 w-auto min-w-max origin-top scale-0 rounded-md
                    bg-[#FFBA49] p-2  px-3 text-sm font-semibold 
    text-white shadow-xl 
    transition-all duration-100 group-hover:scale-100 dark:bg-[#EF5B5B] dark:text-black"
            >
              Settings
            </span>
          </a>
        </Link>
        <div className="text-md flex animate-gradient-x flex-col items-start justify-center  bg-gradient-to-r from-[#FFBA49] to-[#EF5B5B] bg-clip-text font-medium text-transparent md:text-lg">
          <h1>Welcome {props.name.split(' ')[0]} </h1>
          <p className="text-xs md:text-sm">{props.email}</p>
        </div>
      </div>
    </section>
  )
}

export default User
