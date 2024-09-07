import {addToBasket} from "../redux/basketSlice.ts"
import {useDispatch} from "react-redux"
import {toast, ToastContainer} from "react-toastify"
import styles from '../pages/Products.module.scss'

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
        className={styles.btn__add_cart}
        onClick={handleAddToBasket}>
        Add to cart
        {children}
      </button>
      <ToastContainer />
    </>
  )
}

export default AddToBasket
