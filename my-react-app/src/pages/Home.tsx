import {ProductInterface} from "../types/Product.Interface.ts";
import {useFetch} from "../hooks/useFetch.ts";

const Home = () => {
  const {data: products, error, isLoading} = useFetch<ProductInterface>('https://66a4ef2a5dc27a3c190a3666.mockapi.io/product')

  return (
    <div>
      <h1>Products list page</h1>
      {isLoading && <p2 className="loading">Loading...</p2>}
      {error && <p2 className="error">{error}</p2>}
      {!isLoading && !error && (
        <ul className="products__list">
          {!!products.length && products.map((product: ProductInterface) => (
            <li key={product.id} className="product-item">
              <h2 className="product-item__title">{product.price}</h2>
              <p className="product-item__description">{product.description}</p>
              <p className="product-item__category">{product.category}</p>
              <p className="product-item__price">{product.price}</p>
              <img src={product.image} alt={product.name} className="product-item__image"/>
            </li>))}</ul>)}
    </div>
  )
}
export default Home