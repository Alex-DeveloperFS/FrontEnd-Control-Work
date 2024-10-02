import {useState, useEffect, useCallback, useRef} from 'react'
import Product from '../../components/Product.tsx'
import AddProduct from '../../components/AddProduct.tsx'
import {ORDER_BY_LIST, SORT_BY_LIST} from '../../data/mockData.ts'
import InputField from '../../components/form/InputField.tsx'
import SelectField from '../../components/form/SelectField.tsx'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from '../../redux/store.ts'
import {
  fetchAllProducts,
  selectProducts,
  selectProductsError,
  selectProductsLoading
} from '../../redux/productsSlice.ts'
import {createUrl, createUrlCount, API_ITEMS_PER_PAGE_LIMIT} from '../../utils/mockApi.ts'
import {useFetch} from "../../hooks/useFetch.ts"
import {ToastContainer} from "react-toastify"
import {fetchBrands} from '../../redux/brandsSlice.ts'
import useModalMenu from '../../hooks/useModalMenu.ts'
import Modal from "../../modals/Modal.tsx"
import Logins from "../../components/Navbar/Logins/Logins.tsx"
import {ProductInterface} from "../../types/Product.Interface.ts"
import {fetchCategories} from "../../redux/categoriesSlice.ts"

import styles from "./styles/Products.module.scss"
import modalStyles from "../../modals/Modal.module.scss"
import filtersStyles from "./styles/Filters.module.scss"

const Products = () => {
  const [page, setPage] = useState(1)
  const [name, setName] = useState('')
  const [sort, setSort] = useState('')
  const [order, setOrder] = useState('')

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const inputRef = useRef<HTMLInputElement>(null)

  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector(selectProducts)
  const isLoading = useSelector(selectProductsLoading)
  const error = useSelector(selectProductsError)
  const {isLogged} = useSelector((state: RootState) => state.auth)
  const {isMenuOpen, isMobile, openMenu, closeMenu} = useModalMenu()

  const {brands, loading: brandsLoading, error: brandsError} = useSelector((state: RootState) => state.brands)
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError
  } = useSelector((state: RootState) => state.categories)

  useEffect(() => {
    dispatch(fetchAllProducts(createUrl(page, name, sort, order, selectedCategory ? [selectedCategory] : [], selectedBrand ? [selectedBrand] : [])));
  }, [page, name, sort, order, selectedCategory, selectedBrand, dispatch])

  useEffect(() => {
    dispatch(fetchBrands())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const resetFilters = useCallback(() => {
    setName('')
    setSort('')
    setOrder('')
    setSelectedBrand(null)
    setSelectedCategory(null)
    setPage(1)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
    dispatch(fetchAllProducts(createUrl(1, '', '', '', [], [])))
  }, [dispatch])

  const handleBrandChange = useCallback((brand: string) => {
    setSelectedBrand(brand === selectedBrand ? null : brand)
    setPage(1)
  }, [selectedBrand])

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category)
    setPage(1)
  }, [selectedCategory])

  const handleSearch = useCallback(() => {
    setName('')
    setTimeout(() => {
      if (inputRef.current) {
        const newName = inputRef.current.value;
        setName(newName);
        dispatch(fetchAllProducts(createUrl(1, newName, sort, order, selectedCategory ? [selectedCategory] : [], selectedBrand ? [selectedBrand] : [])))
      }
    }, 0)
  }, [sort, order, selectedCategory, selectedBrand, dispatch])

  const reloadProducts = () => {
    const totalProducts = productCount.data.length;
    const totalPages = Math.ceil(totalProducts / API_ITEMS_PER_PAGE_LIMIT)
    setPage(prevPage => (prevPage === 1 && totalPages > 1 ? totalPages : 1))
  }

  const handleBurgerClick = () => {
    if (!isMenuOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  const productCount = useFetch<ProductInterface>(createUrlCount(page, name, sort, order, selectedCategory ? [selectedCategory] : [], selectedBrand ? [selectedBrand] : []))
  const pageCount = productCount.data ? Math.ceil(productCount.data.length / API_ITEMS_PER_PAGE_LIMIT) : 0

  return (
    <>
      <h1 className={styles.products__title}>PRODUCTS</h1>
      <div className={styles.container__products}>

        {isMobile && (
          <button onClick={handleBurgerClick} className={styles.burger}>
            <span className={styles.burger__line}></span>
            <span className={styles.burger__line}></span>
            <span className={styles.burger__line}></span>
          </button>
        )}

        {isMenuOpen && (
          <Modal onClose={closeMenu} className={modalStyles.modal__overlay_cat}>
            <Logins/>
            <div className={styles.filters}>
              <div className={filtersStyles.categories}>
                <h2 className={filtersStyles.filters__title}>Categories:</h2>
                <div className={filtersStyles.categories__buttons}>
                  {categoriesLoading && <p>Loading categories...</p>}
                  {categoriesError && <p>{categoriesError}</p>}
                  {!categoriesLoading && !categoriesError && categories.map((cat) => (
                    <button
                      key={cat}
                      className={`${filtersStyles.categories__btn} ${selectedCategory === cat ? filtersStyles.active : ''}`}
                      onClick={() => handleCategoryChange(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className={filtersStyles.brands}>
                <h2 className={filtersStyles.filters__title}>Brands:</h2>
                <div className={filtersStyles.brands__buttons}>
                  {brandsLoading && <p>Loading brands...</p>}
                  {brandsError && <p>{brandsError}</p>}
                  {!brandsLoading && !brandsError && brands.map((brand) => (
                    <button
                      key={brand}
                      className={`${filtersStyles.brands__btn} ${selectedBrand === brand ? filtersStyles.active : ''}`}
                      onClick={() => handleBrandChange(brand)}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.btn__filter}>
                <button onClick={resetFilters} className={styles.btn__reset}>Reset filters</button>
              </div>
            </div>
          </Modal>
        )}

        {!isMobile && (
          <div className={styles.filters}>
            <div className={filtersStyles.categories}>
              <h2 className={filtersStyles.filters__title}>Categories:</h2>
              <div className={filtersStyles.categories__buttons}>
                {categoriesLoading && <p>Loading categories...</p>}
                {categoriesError && <p>{categoriesError}</p>}
                {!categoriesLoading && !categoriesError && categories.map((cat) => (
                  <button
                    key={cat}
                    className={`${filtersStyles.categories__btn} ${selectedCategory === cat ? filtersStyles.active : ''}`}
                    onClick={() => handleCategoryChange(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.brands}>
              <h2 className={styles.filters__title}>Brands:</h2>
              <div className={styles.brands__buttons}>
                {brandsLoading && <p>Loading brands...</p>}
                {brandsError && <p>{brandsError}</p>}
                {!brandsLoading && !brandsError && brands.map((brand) => (
                  <button
                    key={brand}
                    className={`${styles.brands__btn} ${selectedBrand === brand ? styles.active : ''}`}
                    onClick={() => handleBrandChange(brand)}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.btn__filter}>
              <button onClick={resetFilters} className={styles.btn__reset}>Reset filters</button>
            </div>
          </div>
        )}

        <div className={styles.products}>
          <div className={styles.products__filters}>
            <div className={styles.search__group}>
              <InputField
                ref={inputRef}
                id="filter"
                type="text"
                placeholder="Search by name..."
                className={styles.search__input}
              />
              <button onClick={handleSearch} className={styles.search__btn}>Search</button>
            </div>
            <div className={styles.selects__group}>
              <SelectField
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                options={SORT_BY_LIST}
                className={styles.select__item}
              />
              <SelectField
                id="order"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                options={ORDER_BY_LIST}
                className={styles.select__item}
              />
            </div>
          </div>

          {isLoading && <p className="loading">Loading...</p>}
          {error && <p className="error">Products not found</p>}

          {!isLoading && !error && (
            <div className={styles.content}>
              <div className={styles.buttons__group}>
                {isLogged && (
                  <AddProduct reloadProduct={reloadProducts} resetFilters={resetFilters}/>
                )}
              </div>

              <ul className={styles.products__list}>
                {products.length > 0 ? products.map((product: ProductInterface) => (
                  <Product
                    key={product.id}
                    product={product}
                    reloadProduct={reloadProducts}
                    resetFilters={resetFilters}
                    setPage={setPage}
                    selectedBrand={selectedBrand}
                  />
                )) : <p>No products available</p>}
              </ul>

              <div className={styles.pagination}>
                <button
                  className={styles.pagination__btn}
                  disabled={page === 1}
                  onClick={() => setPage((prevState) => prevState - 1)}
                >
                  Prev
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
                  Next
                </button>
              </div>
            </div>
          )}
          <ToastContainer/>
        </div>
      </div>
    </>
  )
}

export default Products
