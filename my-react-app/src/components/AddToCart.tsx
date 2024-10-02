import {addToBasket} from "../redux/cartSlice.ts"
import {useDispatch} from "react-redux"
import {toast} from "react-toastify"
import styles from '../pages/Products/styles/Products.module.scss'
import {AppDispatch} from "../redux/store.ts";
import {ReactNode} from "react"
import {ProductInterface} from "../types/Product.Interface.ts"

const AddToCart = ({children, product}: {children: ReactNode, product: ProductInterface}) => {

  const dispatch = useDispatch<AppDispatch>()

  const handleAddToBasket = () => {
    dispatch(addToBasket(product))
    console.log('Product added to cart:', product)
    toast.success('Successfully added to cart!')
  }

  return (
    <>
      <button
        className={styles.btn__add_cart}
        onClick={handleAddToBasket}>
        Add to cart
        {children}
      </button>

    </>
  )
}

export default AddToCart
