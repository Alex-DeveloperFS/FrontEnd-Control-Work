import { ReactNode, useState } from 'react'
import { ProductInterface } from '../types/Product.interface.ts'
import { API_URL } from '../utils/mockApi.ts'
import Modal from '../modals/Modal.tsx'
import ProductForm from './form/ProductForm.tsx'
import { useUpdate } from '../hooks/useUpdate.ts'
import {toast} from "react-toastify";
import { useDispatch } from 'react-redux'
import { fetchBrands } from '../redux/brandsSlice.ts'
import styles from '../pages/Products/styles/Products.module.scss'
import modalStyles from '../modals/Modal.module.scss'

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

  const dispatch = useDispatch();

  const handleSubmit = async (product: Partial<ProductInterface>) => {

    try {
      await update(product as ProductInterface)
      handleClose()
      toast.success('Товар успешно изменен!');
      dispatch(fetchBrands())

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <button className={styles.btn__edit} onClick={handleOpen}>
        {children}
      </button>

      {showModal && (
        <Modal onClose={handleClose}>

          <h2 className={modalStyles.modal__title}>Edit product №{product.id}</h2>
          <h2 className={modalStyles.modal__title}>{product.name}</h2>

          {error && <p className="error">{error}</p>}

          <ProductForm onSubmit={handleSubmit} product={product} />
        </Modal>
      )}
    </>
  )
}

export default EditProduct