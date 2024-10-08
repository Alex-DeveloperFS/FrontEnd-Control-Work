import {FormEvent, useState} from 'react'
import InputField from './InputField.tsx'
import {ProductInterface} from "../../types/Product.Interface.ts"
import {clearBasket} from "../../redux/cartSlice.ts"
import {useDispatch} from "react-redux"
import styles from './Form.module.scss'

interface UserInterface {
  name: string;
  surname: string;
  phone: string;
  email: string;
}

interface ProductFormPropsInterface {
  onSubmit: (deal: any) => void
  products: Array<ProductInterface & { quantity: number; totalPrice: number }>
  totalQuantity: number
  totalPrice: number
  usersBuyer: UserInterface
  onClose: () => void
}

const BuyForm = ({onSubmit, products, totalQuantity, totalPrice, usersBuyer, onClose}: ProductFormPropsInterface) => {

  const [name, setName] = useState(usersBuyer.name)
  const [surname, setSurname] = useState(usersBuyer.surname)
  const [phone, setPhone] = useState(usersBuyer.phone)
  const [email, setEmail] = useState(usersBuyer.email)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const dispatch = useDispatch()

  const handleBuy = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const returnedDeal = {
      products,
      totalQuantity,
      totalPrice,
      usersBuyer: {name, surname, phone, email}
    }

    try {
      const response = await fetch('https://66a4ef2a5dc27a3c190a3666.mockapi.io/buyer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(returnedDeal)
      })
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Deal submitted successfully:', await response.json());
      onSubmit(returnedDeal);
      onClose();
      dispatch(clearBasket())
    } catch (error) {
      console.error('Error submitting deal:', error);
      setError('Error submitting your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.buy_form_container}>
      <form className={styles.form__container} onSubmit={handleBuy}>
        <InputField
          id="nameUser"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name..."
          required
          className={`${styles.form__control} ${styles.white}`}
        />
        <InputField
          id="surname"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Enter your surname..."
          required
          className={`${styles.form__control} ${styles.white}`}
        />
        <InputField
          id="phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone..."
          required
          className={`${styles.form__control} ${styles.white}`}
        />
        <InputField
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email..."
          required
          className={`${styles.form__control} ${styles.white}`}
        />

        <h2 className="product-item__title">Order summary:</h2>

        <p>Total Quantity: {totalQuantity}</p>
        <p>Total Price: {totalPrice.toFixed(2)} $</p>

        {error && <p className="form-error">{error}</p>}

        <div className={styles.form__actions}>
          <button className={styles.form__actions_btn} type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Buy Now'}
          </button>

          <button className={styles.form__actions_btn} type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </form>
    </div>
  )
}

export default BuyForm