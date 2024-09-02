import {ProductInterface} from '../../types/Product.interface.ts'
import {FormEvent, useState} from 'react'
import InputField from './InputField.tsx'

export interface UserInterface {
  name: string
  surname: string
  phone: number
  email: string
}

export interface ProductFormPropsInterface {
  onSubmit: (product: Partial<ProductInterface>) => void
  product: Partial<ProductInterface>
  usersBuyer: UserInterface
}

const BuyForm = ({ onSubmit, product, usersBuyer }: ProductFormPropsInterface) => {
  const [name, setName] = useState('' as string)
  const [surname, setSurname] = useState('' as string)
  const [phone, setPhone] = useState('' as number)
  const [email, setEmail] = useState('' as string)


  const handleBuy = (e: FormEvent) => {
    e.preventDefault()
    const returnedDeal: Partial<ProductFormPropsInterface> = {product, usersBuyer}

    if (product.id) {
      returnedDeal.product = {...product}
      returnedDeal.usersBuyer = {name, surname, phone, email}
    }

    console.log(returnedDeal)
    onSubmit(returnedDeal)
  }

  return (
    <form className="buy-form" onSubmit={handleBuy}>
      <InputField
        id="nameUser"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name..."
        required
      />
      <InputField
        id="surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        placeholder="Enter your surname..."
        required
      />
      <InputField
        id="phone"
        type="number"
        value={phone}
        onChange={(e) => setPhone(+e.target.value)}
        placeholder="Enter your phone..."
        required
      />
      <InputField
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email..."
        required
      />

      <h2 className="product-item__title">{}</h2>

      <div className="form-group">
        <button className="form-button" type="submit">
          Купить
        </button>
      </div>
    </form>
  )
}

export default BuyForm