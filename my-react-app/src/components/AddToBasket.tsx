import {addToBasket} from "../redux/basketSlice.ts"
import {useDispatch} from "react-redux"
import {toast, ToastContainer} from "react-toastify";

const AddToBasket = ({children, product}) => {

  const dispatch = useDispatch()

  const handleAddToBasket = () => {
    dispatch(addToBasket(product))
    console.log('Product added to cart:', product)
    toast.success('Товар успешно добавлен в корзину!');
  }

  return (
    <>
      <button
        className="product-item__add-to-cart"
        onClick={handleAddToBasket}>
        Добавить в корзину
        {children}
      </button>
      <ToastContainer />
    </>
  )
}

export default AddToBasket
