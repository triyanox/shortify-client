import Link from 'next/link'
const Footer = () => {
  return (
    <section className="mt-28 flex w-full items-center  justify-center py-8  px-10 md:px-24 lg:mt-4  xl:px-20">
      <h1 className="text-lg   md:text-xl">
        Shortify made by{' '}
        <Link href="https://achaq.codes" passHref>
          <a
            target={'_blank'}
            className="cursor-pointer text-[#FFBA49] dark:text-[#EF5B5B]"
          >
            Mohamed Achaq
          </a>
        </Link>
      </h1>
    </section>
  )
}

export default Footer
