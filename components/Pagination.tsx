// create a pagination component
// this component is used to create a pagination bar
//  this component takes in the page size and the total number of items
//  it then creates a pagination bar with the current page and the total number of pages
//  it then returns the pagination bar
import _ from 'lodash'
type Props = {
  pageSize: number
  totalItems: number
  currentPage: number
  onPageChange: (page: number) => void
}
const Pagination = ({
  pageSize,
  totalItems,
  currentPage,
  onPageChange,
}: Props) => {
  const pagesCount = Math.ceil(totalItems / pageSize)
  if (pagesCount === 1) return null
  const pages = _.range(1, pagesCount + 1)

  return (
    <nav>
      <ul className="mb-12 flex flex-row items-center gap-1">
        {pages.map((page: any) => (
          <li
            onClick={() => onPageChange(page)}
            key={page}
            className={
              page === currentPage
                ? 'flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-[#FFBA49] text-black dark:bg-[#EF5B5B] dark:text-white'
                : 'flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-[#FFBA49] bg-opacity-70 text-black transition-all duration-300 hover:scale-105 active:scale-95 dark:bg-[#EF5B5B] dark:bg-opacity-70 dark:text-white'
            }
          >
            {page}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
