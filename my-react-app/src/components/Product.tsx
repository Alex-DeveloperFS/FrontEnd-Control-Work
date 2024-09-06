import { ProductInterface } from '../types/Product.interface.ts'
import { FaTrash } from 'react-icons/fa6'
import { FaEdit } from 'react-icons/fa'
import { AxiosError } from 'axios'
import { API_URL } from '../utils/mockApi.ts'
import { useDelete } from '../hooks/useDelete.ts'
import EditProduct from './EditProduct.tsx'
import BuyProduct from "./BuyProduct.tsx"
import AddToBasket from "./AddToBasket.tsx"
import { RootState } from "../redux/store.ts"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

interface ProductPropsInterface {
  product: ProductInterface
  reloadProduct: () => void
}

const Product = ({ product: { id, brand, name, description, category, price, image }, reloadProduct }: ProductPropsInterface) => {
  const { isLogged } = useSelector((state: RootState) => state.auth)
  const { delete: deleteProduct } = useDelete(API_URL)

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(id)
      toast.success('Товар успешно удален!')
      reloadProduct()
    } catch (error) {
      console.log((error as AxiosError).message)
    }
  }

  return (
    <li className="product-item">
      <h2 className="product-item__title">{name}</h2>
      <p className="product-item__brand">{brand}</p>
      <p className="product-item__description">{description}</p>
      <p className="product-item__category">{category}</p>
      <p className="product-item__price">{price}</p>
      <img className="product-item__image" src={image} alt={name} />

      {isLogged ? (
        <div className="product-item__actions">
          <button className="product-item__delete" onClick={handleDeleteProduct}>
            <FaTrash />
          </button>
          <EditProduct product={{ id, brand, name, description, category, price, image }} reload={reloadProduct}>
            <FaEdit />
          </EditProduct>
        </div>
      ) : (
        <div className="product-item__actions">
          <BuyProduct product={{ id, brand, name, description, category, price, image }} />
          <AddToBasket product={{ id, brand, name, description, category, price, image }} />
        </div>
      )}
    </li>
  )
}

export default Product
