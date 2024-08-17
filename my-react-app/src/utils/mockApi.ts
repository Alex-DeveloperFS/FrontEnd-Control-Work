export const API_URL = 'https://655c7acd25b76d9884fd5a52.mockapi.io/products'
export const API_ITEMS_PER_PAGE_LIMIT = 12

export function createUrl(page: string | number, name: string, sort: string, order: string): string {
  const urlObj: URL = new URL(API_URL)
  urlObj.searchParams.set('page', `${page}`)
  urlObj.searchParams.set('limit', `${API_ITEMS_PER_PAGE_LIMIT}`)
  name && urlObj.searchParams.set('name', `${name}`)
  sort && urlObj.searchParams.set('sortBy', `${sort}`)
  order && urlObj.searchParams.set('order', `${order}`)
  return urlObj.toString()
}