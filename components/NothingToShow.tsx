import Link from 'next/link'
import React from 'react'

const NothingToShow = () => {
  return (
    <section className="mt-16 flex h-screen w-full flex-col items-center justify-center px-8 py-2 md:px-24 lg:mt-0 xl:px-20">
      <div className="text-5xl text-[#FFBA49]   dark:text-[#EF5B5B]">
        There is nothing to show here !
      </div>
      <Link href="/" passHref>
        <button className="mt-8 rounded-xl bg-[#FFBA49] p-4 px-4 text-3xl text-white dark:bg-[#EF5B5B]  dark:text-black">
          Home
        </button>
      </Link>
    </section>
  )
}

export default NothingToShow
