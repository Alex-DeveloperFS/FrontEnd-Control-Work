import { useState } from 'react'
import { FaBasketShopping } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { clearBasket, removeFromBasket, increaseQuantity, decreaseQuantity } from '../redux/basketSlice.ts'
import { RootState } from '../redux/store.ts'
import Modal from "../modals/Modal.tsx"
import BuyForm from "./form/BuyForm.tsx"
import {toast} from "react-toastify";
import styles from "./Navbar/Navbar.module.scss";
import {FaShoppingCart} from "react-icons/fa";

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

  const products = Object.values(basketItems).map(({ product, quantity }) => ({
    ...product,
    quantity,
    totalPrice: parseFloat(product.price) * quantity
  }))

  const totalQuantity = products.reduce((acc, { quantity }) => acc + quantity, 0)
  const totalPrice = products.reduce((acc, { totalPrice }) => acc + totalPrice, 0)

  return (
    <>
      <button className={styles.navbar__link} onClick={handleOpen}>
        <FaShoppingCart />
      </button>

      {totalQuantity > 0 && <span className="basket-icon__count">{totalQuantity}</span>}

      {showModal && (

        <Modal onClose={handleClose}>

          <div className="modal">

            <h2 className="modal__title">Basket products</h2>

            {products.length > 0 ? (
              products.map(({ id, name, price, quantity, totalPrice }) => (

                <div key={id}>
                  <p>Название: {name}</p>
                  <p>Цена: {price}</p>
                  <p>Количество: {quantity}</p>
                  <p>Общая сумма: ${totalPrice.toFixed(2)}</p>
                  <button onClick={() => handleDecreaseSum(id)}>-</button>
                  <button onClick={() => handleIncreaseSum(id)}>+</button>
                  <button onClick={() => handleRemoveFromBasket(id)} >Удалить</button>
                </div>
              ))
            ) : (
              <p>Корзина пуста</p>
            )}
            <h3>Итоговая сумма: ${totalPrice.toFixed(2)}</h3>
            <button onClick={handleClearBasket} disabled={totalPrice === 0}>Очистить корзину</button>
            <button onClick={handleBuy} disabled={totalPrice === 0}>Купить все</button>
            <button onClick={handleClose}>Close</button>
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
            usersBuyer={{ name: '', surname: '', phone: '', email: '' }}
          />
        </Modal>
      )}
    </>
  )
}

export default Card
