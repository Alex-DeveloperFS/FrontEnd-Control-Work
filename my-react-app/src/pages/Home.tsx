import {ProductInterface} from "../types/Product.Interface.ts";
import {useFetch} from "../hooks/useFetch.ts";
import {API_ITEMS_PER_PAGE_LIMIT, createUrl} from "../utils/mockApi.ts";
import {useState} from "react";
import Product from "../components/Product.tsx";
import AddProductButton from "../components/AddProductButton.tsx";


const Home = () => {
  const [page, setPage] = useState(1)
  const [reload, setReload] = useState('0')
  const {
    data: products,
    error,
    isLoading
  } = useFetch<ProductInterface>(createUrl(page), undefined, reload)

  return (
    <div>
      <h1>Products list page</h1>
      <AddProductButton/>
      {isLoading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!isLoading && !error && (
        <div className="content">
          <div className="pagination">
            <button className="pagination__btn" disabled={page === 1}
                    onClick={() => setPage(prevState => prevState - 1)}>Previous page
            </button>
            <button className="pagination__btn" disabled={products.length < API_ITEMS_PER_PAGE_LIMIT}
                    onClick={() => setPage(prevState => prevState + 1)}>Next page
            </button>
          </div>
          <ul className="products-list">
            {!!products.length &&
              products.map((product: ProductInterface) => (
                <Product product={product} reload={() => setReload(product.id)} key={product.id}/>
              ))}
          </ul>
        </div>
      )}
    </div>
  )
}
export default Home