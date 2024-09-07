import { useState } from 'react'
import Modal from '../modals/Modal.tsx'
import ProductForm from './form/ProductForm.tsx'
import { ProductInterface } from '../types/Product.interface.ts'
import { useAdd } from '../hooks/useAdd.ts'
import { API_URL } from '../utils/mockApi.ts'
import { INITIAL_PRODUCT } from '../data/mockData.ts'
import { toast } from "react-toastify"
import styles from '../pages/Products.module.scss'

interface AddProductProps {
  reloadProduct: () => void
}

const AddProduct = ({ reloadProduct }: AddProductProps) => {
  const [showModal, setShowModal] = useState(false)
  const { add, error } = useAdd(API_URL)

  const handleOpen = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

  const handleSubmit = async (product: Partial<ProductInterface>) => {
    try {
      await add(product)
      handleClose()
      toast.success('Товар успешно создан!')
      reloadProduct()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <button className={styles.add__product__btn} onClick={handleOpen}>
        Add product
      </button>

      {showModal && (
        <Modal onClose={handleClose}>
          <h2 className="modal__title">Add a new product</h2>
          {error && <p className="error">{error}</p>}
          <ProductForm onSubmit={handleSubmit} product={INITIAL_PRODUCT} />
        </Modal>
      )}
    </>
  )
}

export default AddProduct;
