import { Key, useState } from 'react'
import UrlCard from './UrlCard'
import { useUrl } from './UrlContext'
import Pagination from './Pagination'
import Paginate from './Paginate'
const UrlsCreated = () => {
  const { urls, setUrls } = useUrl()
  const [page, setPage] = useState(1)
  const handleChange = (page: number) => {
    setPage(page)
  }
  const urlsCreated = Paginate(urls, 10, page)
  return (
    <section className="mt-8 w-full   items-center gap-2  px-8 py-2 md:px-24 xl:px-20">
      <div className="mb-8 grid w-full grid-rows-10 items-center">
        {urlsCreated ? (
          urlsCreated.map(
            (
              url: { short_url: string; original_url: string },
              i: Key | null | undefined
            ) => (
              <UrlCard
                shortUrl={url.short_url}
                originalUrl={url.original_url}
                key={i}
              />
            )
          )
        ) : (
          <div />
        )}
      </div>
      <Pagination
        pageSize={10}
        totalItems={urls.length}
        onPageChange={handleChange}
        currentPage={page}
      />
    </section>
  )
}

export default UrlsCreated
