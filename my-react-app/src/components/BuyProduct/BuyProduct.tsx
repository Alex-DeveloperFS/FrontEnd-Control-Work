import { useState } from 'react'
import BuyForm from "./form/BuyForm.tsx"
import {ProductInterface} from "../types/Product.Interface.ts"
import Modal from "../modals/Modal.tsx"
import {toast} from "react-toastify"
import styles from '../pages/Products/styles/Products.module.scss'

interface BuyProductProps {
  product: ProductInterface
  children?: ReactNode
}

const BuyProduct = ({children, product}: BuyProductProps) => {
  const [showModal, setShowModal] = useState(false)
  const [quantity, setQuantity] = useState(1)  // Добавляем состояние для количества

  const handleOpen = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

  // Пересчитаем общую цену и количество
  const totalPrice = product.price * quantity

  const handleSubmit = (deal) => {
    setShowModal(false)
    toast.success('Товар успешно куплен!')
  }

  return (
    <>
      <button className={styles.btn__buy} onClick={handleOpen}>
        Buy product
        {children}
      </button>

      {showModal && (
        <Modal onClose={handleClose}>
          <h2 className="modal__title">Buy product</h2>
          <h3>Купить Товар</h3>
          <p>Название: {product.name}</p>
          <p>Цена за единицу: {product.price}</p>

          <label htmlFor="quantity">Количество:</label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <p>Общая стоимость: {totalPrice}</p>

          <img className="product-item__image" src={product.image} alt={product.name}></img>

          <BuyForm
            onSubmit={handleSubmit}
            onClose={handleClose}
            products={[{...product, quantity}]}  // Передаем количество продукта
            totalQuantity={quantity}
            totalPrice={totalPrice}
            usersBuyer={{ name: '', surname: '', phone: '', email: '' }}
          />
        </Modal>
      )}
    </>
  )
}

export default BuyProduct

