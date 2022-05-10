import _ from 'lodash'

const Paginate = (
  items: {
    original_url: string
    short_url: string
  }[],
  pageSize: number,
  currentPage: number
) => {
  const startIndex = (currentPage - 1) * pageSize

  if(items.length === 0) {
    return []
  }

  return _(items).slice(startIndex).take(pageSize).value()
  
}

export default Paginate
