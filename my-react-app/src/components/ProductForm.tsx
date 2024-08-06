import {ProductInterface} from "../types/Product.Interface.ts";
import {useState} from "react";

interface ProductFormPropsInterface {
  onSubmit: (product: ProductInterface) => void
}


const ProductForm = ({onSubmit}: ProductFormPropsInterface) => {
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('https://loremflickr.com/cache/resized/65535_53808253434_fb17cb6c27_320_240_nofilter.jpg')
  const [category, setCategory] = useState('')


  return (
    <div>ProductForm</div>
  )
}
export default ProductForm