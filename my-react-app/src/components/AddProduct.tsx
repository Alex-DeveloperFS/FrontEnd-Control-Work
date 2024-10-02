import { useState } from 'react'
import Modal from '../modals/Modal.tsx'
import ProductForm from './form/ProductForm.tsx'
import { ProductInterface } from '../types/Product.Interface.ts'
import { useAdd } from '../hooks/useAdd.ts'
import { API_URL, createUrl } from '../utils/mockApi.ts'
import { INITIAL_PRODUCT } from '../data/mockData.ts'
import { toast } from "react-toastify"
import styles from '../pages/Products/styles/Products.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBrands } from '../redux/brandsSlice.ts'
import { fetchAllProducts } from "../redux/productsSlice.ts"
import { AppDispatch, RootState } from '../redux/store.ts'
import modalStyles from '../modals/Modal.module.scss'
import { fetchCategories } from "../redux/categoriesSlice.ts"

interface AddProductProps {
  reloadProduct: () => void
  resetFilters: () => void
}

const AddProduct = ({ reloadProduct }: AddProductProps) => {
  const [showModal, setShowModal] = useState(false)
  const { add, error } = useAdd(API_URL)

  const handleOpen = () => setShowModal(true)
  const handleClose = () => setShowModal(false)

  const dispatch = useDispatch<AppDispatch>()

  const { page, name, sort, order, selectedCategory, selectedBrand } = useSelector((state: RootState) => state.productsFilters)

  const handleSubmit = async (product: Partial<ProductInterface>) => {
    try {
      console.log('Добавление продукта:', product);
      await add(product);
      handleClose();
      toast.success('Successfully created!');

      dispatch(fetchBrands());
      dispatch(fetchCategories());

      const url = createUrl(page, name, sort, order, selectedCategory ? [selectedCategory] : [],selectedBrand ? [selectedBrand] : []);
      dispatch(fetchAllProducts(url));

      reloadProduct();
    } catch (error) {
      toast.error('Error adding product!');
    }
  }

  return (
    <>
      <button className={styles.btn__add_product} onClick={handleOpen}>
        Add product
      </button>

      {showModal && (
        <Modal onClose={handleClose}>
          <h2 className={modalStyles.modal__title}>Add a new product</h2>
          {error && <p className="error">{error}</p>}
          <ProductForm onSubmit={handleSubmit} product={INITIAL_PRODUCT} />
        </Modal>
      )}
    </>
  )
}

export default AddProduct
