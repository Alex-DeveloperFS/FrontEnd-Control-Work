import { ReactNode, useState } from 'react'
import { ProductInterface } from '../types/Product.interface.ts'
import { API_URL } from '../utils/mockApi.ts'
import Modal from '../modals/Modal.tsx'
import ProductForm from './form/ProductForm.tsx'
import { useUpdate } from '../hooks/useUpdate.ts'
import {toast} from "react-toastify";

interface EditProductButtonPropsInterface {
  children: ReactNode
  product: ProductInterface
  reload: () => void
}

const EditProduct = ({ children, product, reload }: EditProductButtonPropsInterface) => {
  const [showModal, setShowModal] = useState(false)
  const { update, error } = useUpdate(API_URL)

  const handleOpen = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

  const handleSubmit = async (product: Partial<ProductInterface>) => {

    try {
      await update(product as ProductInterface)
      handleClose()
      toast.success('Товар успешно изменен!');
      // reload()

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <button className="product-item__edit" onClick={handleOpen}>
        {children}
      </button>

      {showModal && (
        <Modal onClose={handleClose}>

          <h2 className="modal__title">
            Edit product №{product.id}, {product.name}
          </h2>

          {error && <p className="error">{error}</p>}

          <ProductForm onSubmit={handleSubmit} product={product} />
        </Modal>
      )}
    </>
  )
}

export default EditProduct