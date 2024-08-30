import {ProductInterface} from "../types/Product.Interface.ts";
import {useFetch} from "../hooks/useFetch.ts";
import {API_ITEMS_PER_PAGE_LIMIT, createUrl, createUrlCount, } from "../utils/mockApi.ts";
import {useEffect, useRef, useState} from "react";
import Product from "../components/Product.tsx";
import AddProduct from "../components/AddProduct.tsx";
import {debounce} from "../utils/debounce.ts";
import {ORDER_BY_LIST,  SORT_BY_LIST, } from "../data/mockData.ts";
import {MdRefresh} from "react-icons/md";
import InputField from "../components/form/InputField.tsx";
import SelectField from "../components/form/SelectField.tsx";
import axios from "axios";


const Products = () => {
  const [page, setPage] = useState(1)
  const [name, setName] = useState('')
  const [sort, setSort] = useState('')
  const [order, setOrder] = useState('')
  const [reload, setReload] = useState('0')

  const inputRef = useRef<HTMLInputElement>(null)

  const { data: products, error, isLoading} = useFetch<ProductInterface>(createUrl(page, name, sort, order), undefined, reload)

  const debouncedSetName = debounce(setName, 1000)

  const resetFilters = () => {
    setName('')
    setSort('')
    setOrder('')
    inputRef.current && (inputRef.current.value = '')
  }

  const totalCount = useFetch<ProductInterface>(createUrlCount(page, name, sort, order))

  console.log(totalCount.data.length)


  return (
    <div>
      <h1>Products list page</h1>
      <div className="products-filter">
        <InputField
          type="text"
          id="filter"
          ref={inputRef}
          placeholder="Filter products by name..."
          onChange={e => debouncedSetName(e.target.value)}
        />

        <SelectField
          id={sort}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          options={SORT_BY_LIST} />

        <SelectField
          id={order}
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          options={ORDER_BY_LIST} />

        <button className="form-button" onClick={resetFilters}><MdRefresh/></button>

      </div>

      {isLoading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!isLoading && !error && (
        <div className="content">

          <div className="buttons-group">
            <AddProduct/>

            <div className="pagination">
              <button className="pagination__btn"
                      disabled={page === 1}
                      onClick={() => setPage(prevState => prevState - 1)}>
                Previous page
              </button>



              <button className="pagination__btn"
                      disabled={products.length < API_ITEMS_PER_PAGE_LIMIT}
                      onClick={() => setPage(prevState => prevState + 1)}>
                Next page
              </button>
            </div>
          </div>

          <ul className="products-list">
            {!!products.length &&
              products.map((product: ProductInterface) => (
                <Product product={product} reload={() => setReload(product.id + Date.now())} key={product.id}/>
              ))}
          </ul>
        </div>
      )}
    </div>
  )
}
export default Products