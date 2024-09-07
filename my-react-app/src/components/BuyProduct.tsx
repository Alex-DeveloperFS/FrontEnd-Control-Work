import { useState } from 'react'
import BuyForm from "./form/BuyForm.tsx"
import {ProductInterface} from "../types/Product.Interface.ts"
import Modal from "../modals/Modal.tsx"
import {toast} from "react-toastify"
import styles from '../pages/Products.module.scss'

interface BuyProductProps {
  product: ProductInterface
  children?: ReactNode
}

const BuyProduct = ({children, product}: BuyProductProps) => {
  const [showModal, setShowModal] = useState(false)

  const products = [product]
  const totalQuantity = products.reduce((sum, p) => sum + (p.quantity || 1), 0)
  const totalPrice = products.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0)

  const handleOpen = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

  const handleSubmit = (deal) => {
    setShowModal(false)
    toast.success('Товар успешно куплен!')
  }

  return (
    <>
      <button className={styles.btn__buy} onClick={handleOpen} >
        Buy product
        {children}
      </button>

      {showModal && (
        <Modal onClose={handleClose}>
          <h2 className="modal__title">Buy product </h2>
          <h3>Купить Товар</h3>
          <p>Название: {product.name}</p>
          <p>Цена: {product.price}</p>
          <img className="product-item__image" src={product.image} alt={product.name}></img>

          <BuyForm onSubmit={handleSubmit}
                   onClose={() => setShowModal(false)}
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

export default BuyProduct
