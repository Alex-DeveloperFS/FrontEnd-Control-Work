import { ProductInterface } from '../../types/Product.interface.ts'
import { FormEvent, useState } from 'react'
import { PRODUCT_CATEGORIES } from '../../data/mockData.ts'
import InputField from './InputField.tsx'
import SelectField from './SelectField.tsx'
import {toast, ToastContainer} from "react-toastify";

interface ProductFormPropsInterface {
  onSubmit: (product: Partial<ProductInterface>) => void
  product: Partial<ProductInterface>
}

const ProductForm = ({ onSubmit, product }: ProductFormPropsInterface) => {
  const [name, setName] = useState(product.name as string)
  const [brand, setBrand] = useState(product.brand as string)
  const [description, setDescription] = useState(product.description as string)
  const [price, setPrice] = useState(product.price as number)
  const [image, setImage] = useState(product.image as string)
  const [category, setCategory] = useState(product.category as string)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const returnedProduct: Partial<ProductInterface> = { name, brand, description, price, image, category }

    if (product.id) {
      returnedProduct.id = product.id
    }
    onSubmit(returnedProduct)

  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product name..." />
      <InputField
        id="brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        placeholder="Brand..." />
      <InputField
        id="description"
        textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Product description..."
      />
      <InputField
        id="price"
        type="number"
        value={`${price}`}
        onChange={(e) => setPrice(+e.target.value)}
        placeholder="Price..."
      />
      <InputField
        id="image"
        type="url"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL..."
      />
      <SelectField
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={PRODUCT_CATEGORIES}
      />
      <div className="form-group">
        <button className="form-button" type="submit">
          Submit
        </button>
      </div>

    </form>
  )
}

export default ProductForm