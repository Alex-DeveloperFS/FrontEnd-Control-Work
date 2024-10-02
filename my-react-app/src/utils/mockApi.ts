export const API_URL = 'https://66a4ef2a5dc27a3c190a3666.mockapi.io/product'
export const API_ITEMS_PER_PAGE_LIMIT = 12

export function createUrl(page: string | number, name: string, sort: string, order: string, selectedCategory: string[], brand: string[],): string {
  const urlObj: URL = new URL(API_URL);
  urlObj.searchParams.set('page', `${page}`);
  urlObj.searchParams.set('limit', `${API_ITEMS_PER_PAGE_LIMIT}`);
  if (name) urlObj.searchParams.set('name', name);
  if (sort) urlObj.searchParams.set('sortBy', sort);
  if (order) urlObj.searchParams.set('order', order);
  if (brand.length) urlObj.searchParams.set('brand', brand.join(','));
  if (selectedCategory.length) urlObj.searchParams.set('category', selectedCategory[0]);

  return urlObj.toString();
}

export function createUrlCount(page: string | number, name: string, sort: string, order: string, selectedCategory: string[], brand: string[]): string {
  const urlObj: URL = new URL(API_URL);
  urlObj.searchParams.set('page', `${page}`);
  if (name) urlObj.searchParams.set('name', name);
  if (sort) urlObj.searchParams.set('sortBy', sort);
  if (order) urlObj.searchParams.set('order', order);
  if (brand.length) urlObj.searchParams.set('brand', brand.join(','));
  if (selectedCategory.length) urlObj.searchParams.set('category', selectedCategory[0]);

  return urlObj.toString();
}
