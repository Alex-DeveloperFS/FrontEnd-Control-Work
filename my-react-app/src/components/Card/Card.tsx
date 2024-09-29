import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {clearBasket, removeFromBasket, increaseQuantity, decreaseQuantity} from '../../redux/basketSlice.ts'
import {RootState} from '../../redux/store.ts'
import Modal from "../../modals/Modal.tsx"
import BuyForm from "../form/BuyForm.tsx"
import {toast} from "react-toastify";
import {FaShoppingCart} from "react-icons/fa";
import styles from "./Card.module.scss";
import navbarStyles from "../Navbar/Navbar.module.scss";
import modalStyle from "../../modals/Modal.module.scss";

const Card = () => {
  const [showModal, setShowModal] = useState(false)
  const [showBuyForm, setShowBuyForm] = useState(false)

  const dispatch = useDispatch()
  const basketItems = useSelector((state: RootState) => state.basket.items)

  const handleOpen = () => setShowModal(true)
  const handleClose = () => {
    setShowModal(false)
    setShowBuyForm(false)
  }

  const handleSubmit = () => {
    setShowBuyForm(false)
    toast.success('Товар успешно куплен!')
  }

  const handleRemoveFromBasket = (productId: number) => {
    dispatch(removeFromBasket(productId))
  }

  const handleClearBasket = () => {
    dispatch(clearBasket())
  }

  const handleIncreaseSum = (productId: number) => {
    dispatch(increaseQuantity(productId))
  }

  const handleDecreaseSum = (productId: number) => {
    dispatch(decreaseQuantity(productId))
  }

  const handleBuy = () => {
    setShowModal(false)
    setShowBuyForm(true)

  }

  const products = Object.values(basketItems).map(({product, quantity}) => ({
    ...product,
    quantity,
    totalPrice: parseFloat(product.price) * quantity
  }))

  const totalQuantity = products.reduce((acc, {quantity}) => acc + quantity, 0)
  const totalPrice = products.reduce((acc, {totalPrice}) => acc + totalPrice, 0)

  return (
    <>
      <button className={navbarStyles.navbar__link} onClick={handleOpen}>
        <FaShoppingCart/>
      </button>

      {totalQuantity > 0 && <span className="basket-icon__count">{totalQuantity}</span>}

      {showModal && (

        <Modal onClose={handleClose}>

          <div className="modal">

            <h2 className={modalStyle.modal__title}>CART</h2>


            <div className={styles.cart__content}>
              {products.length > 0 ? (
                products.map(({id, image, name, price, quantity, totalPrice}) => (

                  <div key={id} className={styles.product__list}>

                    <div className={styles.product__items}>

                      <img src={image} alt="image" className={styles.product__image}/>

                      <p className={styles.product__name}>Name: </p>
                      <p className={styles.product__price}>Price: </p>
                      <p className={styles.product__quantity}>PCS:</p>
                      <p className={styles.product__sum}>Total price:</p>

                      <p className={styles.product__name_map}>{name}</p>
                      <p className={styles.product__price_map}>{price}</p>
                      <p className={styles.product__quantity_map}>{quantity}</p>
                      <p className={styles.product__sum_map}>{totalPrice.toFixed(2)}$</p>
                    </div>


                    <div className={styles.cart__butons}>
                      <button className={styles.cart__change} onClick={() => handleDecreaseSum(id)}>-</button>
                      <button className={styles.cart__change} onClick={() => handleIncreaseSum(id)}>+</button>
                      <button className={styles.cart__btn} onClick={() => handleRemoveFromBasket(id)}>Delete</button>
                    </div>

                  </div>
                ))
              ) : (
                <p className="error">Сart is empty</p>
              )}


              <h3>Total amount: {totalPrice.toFixed(2)}$</h3>


              <div className={styles.cart__butons}>
                <button className={styles.cart__btn} onClick={handleClearBasket} disabled={totalPrice === 0}>Clear cart</button>
                <button className={styles.cart__btn} onClick={handleBuy} disabled={totalPrice === 0}>Buy all</button>
                <button className={styles.cart__btn} onClick={handleClose}>Close</button>
              </div>

            </div>

          </div>
        </Modal>
      )}
      {showBuyForm && (
        <Modal onClose={handleClose}>
          <BuyForm
            onSubmit={handleSubmit}
            onClose={() => setShowBuyForm(false)}
            products={products}
            totalQuantity={totalQuantity}
            totalPrice={totalPrice}
            usersBuyer={{name: '', surname: '', phone: '', email: ''}}
          />
        </Modal>
      )}
    </>
  )
}

export default Card
