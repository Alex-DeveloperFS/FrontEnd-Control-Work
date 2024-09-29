import {useState, useEffect, useCallback, useRef} from 'react'
import Product from '../../components/Product.tsx'
import AddProduct from '../../components/AddProduct.tsx'
import {debounce} from '../../utils/debounce.ts'
import {ORDER_BY_LIST, SORT_BY_LIST, PRODUCT_CATEGORIES} from '../../data/mockData.ts';
import InputField from '../../components/form/InputField.tsx';
import SelectField from '../../components/form/SelectField.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store.ts';
import {
  fetchAllProducts,
  selectProducts,
  selectProductsError,
  selectProductsLoading
} from '../../redux/productsSlice.ts';
import {createUrl, createUrlCount, API_ITEMS_PER_PAGE_LIMIT} from '../../utils/mockApi.ts';
import {useFetch} from "../../hooks/useFetch.ts";
import {ToastContainer} from "react-toastify";
import {fetchBrands} from '../../redux/brandsSlice.ts';
import styles from "./styles/Products.module.scss";

const Products = () => {
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('');
  const [category, setCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [reload, setReload] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const isLoading = useSelector(selectProductsLoading);
  const error = useSelector(selectProductsError);
  const {isLogged} = useSelector((state: RootState) => state.auth);
  const {brands, loading: brandsLoading, error: brandsError} = useSelector((state: RootState) => state.brands);

  useEffect(() => {
    dispatch(fetchAllProducts(createUrl(page, name, sort, order, category, selectedBrand ? [selectedBrand] : [])));
  }, [page, sort, order, category, selectedBrand, reload, dispatch]);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  const debouncedSetName = useCallback(debounce(setName, 1000), []);

  const resetFilters = useCallback(() => {
    setName(''); // Сбрасываем имя поиска
    setSort('');
    setOrder('');
    setCategory('');
    setSelectedBrand(null);
    setPage(1); // Сбрасываем страницу на первую
    if (inputRef.current) {
      inputRef.current.value = ''; // Сбрасываем значение инпута
    }
    dispatch(fetchAllProducts(createUrl(page, name, sort, order, category, selectedBrand ? [selectedBrand] : [])));
  }, []);

  const handleBrandChange = useCallback((brand: string) => {
    setSelectedBrand(brand === selectedBrand ? null : brand); // Сбрасывает выбранный бренд при повторном клике
    setPage(1); // Сбрасываем на первую страницу при изменении фильтра
  }, [selectedBrand]);

  const productCount = useFetch<ProductInterface>(createUrlCount(page, name, sort, order, category, selectedBrand ? [selectedBrand] : []));
  const pageCount = productCount.data ? Math.ceil(productCount.data.length / API_ITEMS_PER_PAGE_LIMIT) : 0;

  const reloadProducts = () => {
    setReload(prev => !prev);
    const totalProducts = productCount.data.length;
    const totalPages = Math.ceil(totalProducts / API_ITEMS_PER_PAGE_LIMIT);
    setPage(prevPage => (prevPage === 1 && totalPages > 1 ? totalPages : 1));
  };

  // Обработчик для поиска
  const handleSearch = () => {
    setPage(1); // Сбрасываем на первую страницу
    dispatch(fetchAllProducts(createUrl(1, name, sort, order, category, selectedBrand ? [selectedBrand] : [])));
  };

  return (
    <>

      <h1 className={styles.products__title}>PRODUCTS</h1>
      <div className={styles.container__products}>

        <div className={styles.filters}>
          <div className={styles.categories}>
            <h2 className={styles.filters__title}>Categories:</h2>

            <div className={styles.categories__buttons}>
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  className={`${styles.categories__btn} ${category === cat.value ? styles.active : ''}`}
                  onClick={() => setCategory(cat.value)}
                >
                  {cat.text}
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

        <div className={styles.products}>

          <div className={styles.products__filters}>
            <div className={styles.search__group}>
              <InputField
                ref={inputRef}
                id="filter"
                type="text"
                placeholder="Search by name..."
                onChange={(e) => debouncedSetName(e.target.value)}
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
  );
}

export default Products;

