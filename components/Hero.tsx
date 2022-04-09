import Link from 'next/link'
import Image from 'next/image'
import light from '../assets/hero-light.svg'
import dark from '../assets/hero-dark.svg'

const Hero = () => {
  return (
    <section className="mt-28 flex w-full flex-col-reverse items-center justify-center gap-y-8 px-10 md:px-24 lg:mt-4 lg:h-screen lg:flex-row xl:px-20">
      <div className="flex w-full  flex-col items-start justify-center gap-y-2 text-black dark:text-white">
        <h1 className="mb-6 animate-gradient-x bg-gradient-to-r from-[#FFBA49] to-[#EF5B5B] bg-clip-text text-2xl font-bold text-transparent md:text-4xl">
          Shortify
        </h1>
        <h2 className="text-lg text-gray-800 dark:text-gray-200 md:text-2xl">
          Short links, big results
        </h2>
        <p className="text-md text-gray-700 dark:text-gray-300 md:text-xl">
          A URL shortener built with powerful tools to help you grow and protect
          your brand.
        </p>
        <Link href="/signup" passHref>
          <button className="mt-2 w-full rounded-lg bg-[#FFBA49] p-4 py-2 text-lg text-white transition-all duration-200 ease-in hover:scale-105 active:scale-90 dark:bg-[#EF5B5B]  dark:text-black md:text-2xl lg:mt-8 lg:w-52">
            Get Started !
          </button>
        </Link>
      </div>
      <div className="z-10 flex w-full flex-col  items-center justify-center p-2 dark:z-0 dark:hidden">
        <Image src={light} width={512} height={512} alt="Mohamed Achaq" />
      </div>
      <div className="z-0 hidden flex-col items-center  justify-center p-2 dark:z-10 dark:flex dark:w-full">
        <Image src={dark} width={512} height={512} alt="Mohamed Achaq" />
      </div>
    </section>
  )
}

export default Hero
