import {useState, useEffect, useCallback, useRef} from 'react'
import Product from '../components/Product.tsx'
import AddProduct from '../components/AddProduct.tsx'
import {debounce} from '../utils/debounce.ts'
import {ORDER_BY_LIST, SORT_BY_LIST, PRODUCT_CATEGORIES} from '../data/mockData.ts'
import InputField from '../components/form/InputField.tsx'
import SelectField from '../components/form/SelectField.tsx'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '../redux/store.ts'
import {fetchAllProducts, selectProducts, selectProductsError, selectProductsLoading} from '../redux/productsSlice.ts'
import {createUrl, createUrlCount, API_ITEMS_PER_PAGE_LIMIT} from '../utils/mockApi.ts'
import {useFetch} from "../hooks/useFetch.ts"
import useBrands from "../hooks/useBrands.ts"
import {ToastContainer} from "react-toastify";
import styles from "./Products.module.scss"

const Products = () => {
  const [page, setPage] = useState(1)
  const [name, setName] = useState('')
  const [sort, setSort] = useState('')
  const [order, setOrder] = useState('')
  const [category, setCategory] = useState('')
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [reload, setReload] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector(selectProducts)
  const isLoading = useSelector(selectProductsLoading)
  const error = useSelector(selectProductsError)
  const {isLogged} = useSelector((state: RootState) => state.auth)

  const {brands, loading: brandsLoading, error: brandsError} = useBrands()

  useEffect(() => {
    dispatch(fetchAllProducts(createUrl(page, name, sort, order, category, selectedBrand ? [selectedBrand] : [])))
  }, [page, name, sort, order, category, selectedBrand, reload, dispatch])

  const debouncedSetName = useCallback(debounce(setName, 1000), [])

  const resetFilters = useCallback(() => {
    setName('')
    setSort('')
    setOrder('')
    setCategory('')
    setSelectedBrand(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }, [])

  const handleBrandChange = useCallback((brand: string) => {
    setSelectedBrand(brand)
  }, [])

  const productCount = useFetch<ProductInterface>(createUrlCount(page, name, sort, order, category, selectedBrand ? [selectedBrand] : []))
  const pageCount = productCount.data ? Math.ceil(productCount.data.length / API_ITEMS_PER_PAGE_LIMIT) : 0

  const reloadProducts = () => {

    setReload(prev => !prev);

    const totalProducts = productCount.data.length;
    const totalPages = Math.ceil(totalProducts / API_ITEMS_PER_PAGE_LIMIT);

    setPage(prevPage => {
      if (prevPage === 1 && totalPages > 1) {
        return totalPages + 1
      } else {
        prevPage = 1
      }
      return prevPage
    })
  }

  return (
    <div className="box">
      <div className="filters-menu">
        <h2>Filters</h2>
        <div className="category-buttons">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              className={`category-btn ${category === cat.value ? 'active' : ''}`}
              onClick={() => setCategory(cat.value)}
            >
              {cat.text}
            </button>
          ))}
        </div>
        <div className="brand-buttons">
          <h3>Brands</h3>
          {brandsLoading && <p>Loading brands...</p>}
          {brandsError && <p>{brandsError}</p>}

          {!brandsLoading && !brandsError && brands.map((brand) => (
            <button
              key={brand}
              className={`brand-btn ${selectedBrand === brand ? 'active' : ''}`}
              onClick={() => handleBrandChange(brand)}
            >
              {brand}
            </button>
          ))}
          <button onClick={resetFilters}>Reset filters</button>
        </div>
      </div>

      <div className={styles.products__box}>

        <div className={styles.products__filters}>

          <InputField
            ref={inputRef}
            id="filter"
            type="text"
            placeholder="Search products by name..."
            onChange={(e) => debouncedSetName(e.target.value)}
            className={styles.products__input}
          />

          <div className={styles.products__selects}>
            <SelectField
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              options={SORT_BY_LIST}
              className={styles.products__select}
            />

            <SelectField
              id="order"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              options={ORDER_BY_LIST}
              className={styles.products__select}/>
          </div>
        </div>


        {isLoading && <p className="loading">Loading...</p>}
        {error && <p className="error">Продукты не найдены</p>}

        {!isLoading && !error && (
          <div className="content">

            <div className="buttons-group">
              {isLogged && (
                <AddProduct reloadProduct={reloadProducts}/>
              )}
            </div>

            <ul className="products-list">
              {!!products.length &&
                products.map((product: ProductInterface) => (
                  <Product key={product.id} product={product} reloadProduct={reloadProducts}/>
                ))}
            </ul>
            <div className={styles.pagination}>
              <button
                className={styles.pagination__btn}
                disabled={page === 1}
                onClick={() => setPage((prevState) => prevState - 1)}
              >
                Previous page
              </button>

              {[...Array(pageCount)].map((_, i) => (
                <button
                  key={i + 1}

                  className={`${styles.pagination__btn} ${page === i + 1 ? styles.active : ''}`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className={styles.pagination__btn}
                disabled={products.length < API_ITEMS_PER_PAGE_LIMIT}
                onClick={() => setPage((prevState) => prevState + 1)}
              >
                Next page
              </button>
            </div>

          </div>
        )}
        <ToastContainer/>
      </div>
    </div>
  )
}

export default Products;
