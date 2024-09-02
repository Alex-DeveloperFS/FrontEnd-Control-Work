import { FormEvent, useState } from 'react';
import InputField from './InputField.tsx';
import { ProductInterface } from '../../types/Product.interface.ts';

export interface UserInterface {
  name: string;
  surname: string;
  phone: string;
  email: string;
}

export interface ProductFormPropsInterface {
  onSubmit: (deal: any) => void;
  products: Array<ProductInterface & { quantity: number; totalPrice: number }>;
  totalQuantity: number;
  totalPrice: number;
  usersBuyer: UserInterface;
}

const BuyForm = ({ onSubmit, products, totalQuantity, totalPrice, usersBuyer }: ProductFormPropsInterface) => {
  const [name, setName] = useState(usersBuyer.name);
  const [surname, setSurname] = useState(usersBuyer.surname);
  const [phone, setPhone] = useState(usersBuyer.phone);
  const [email, setEmail] = useState(usersBuyer.email);

  const handleBuy = (e: FormEvent) => {
    e.preventDefault();
    const returnedDeal = {
      products,
      totalQuantity,
      totalPrice,
      usersBuyer: { name, surname, phone, email }
    };

    console.log(returnedDeal);
    onSubmit(returnedDeal);
  };

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
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
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

      <h2 className="product-item__title">Order Summary</h2>
      <p>Total Quantity: {totalQuantity}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>

      <div className="form-group">
        <button className="form-button" type="submit">
          Купить
        </button>
      </div>
    </form>
  );
};

export default BuyForm;
