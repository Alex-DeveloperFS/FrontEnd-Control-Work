import {useState} from 'react'
import BuyForm from "../form/BuyForm.tsx"
import {ProductInterface} from "../../types/Product.Interface.ts"
import Modal from "../../modals/Modal.tsx"
import {toast} from "react-toastify"
import styles from '../../pages/Products/styles/Products.module.scss'
import buyProductStyles from './BuyProduct.module.scss'
import modalStyles from '../../modals/Modal.module.scss'


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
          <h2 className={modalStyles.modal__title}>Buy product</h2>

          <div className={buyProductStyles.product__items}>
            <img className={buyProductStyles.product__image} src={product.image} alt={product.name}></img>

            <div className={buyProductStyles.product__list}>
              <p className={buyProductStyles.product__name}>Name:</p>
              <p className={buyProductStyles.product__price}>Price:</p>
              <label className={buyProductStyles.product__quantity} htmlFor="quantity">Quantity:</label>
              <p className={buyProductStyles.product__total_price}>Total price:</p>

              <p className={buyProductStyles.product__name_map}>{product.name}</p>
              <p className={buyProductStyles.product__price_map}>{product.price} $</p>
              <input
                className={buyProductStyles.product__quantity_map}
                id="quantity"
                type="number"
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <p className={buyProductStyles.product__total_price_map}>{totalPrice} $</p>
            </div>
          </div>
          <BuyForm
            onSubmit={handleSubmit}
            onClose={handleClose}
            products={[{...product, quantity}]}  // Передаем количество продукта
            totalQuantity={quantity}
            totalPrice={totalPrice}
            usersBuyer={{name: '', surname: '', phone: '', email: ''}}
          />
        </Modal>
      )}
    </>
  )
}

export default BuyProduct

