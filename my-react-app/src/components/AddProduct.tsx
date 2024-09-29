import { useState } from 'react';
import Modal from '../modals/Modal.tsx';
import ProductForm from './form/ProductForm.tsx';
import { ProductInterface } from '../types/Product.interface.ts';
import { useAdd } from '../hooks/useAdd.ts';
import { API_URL, createUrl } from '../utils/mockApi.ts';
import { INITIAL_PRODUCT } from '../data/mockData.ts';
import { toast } from "react-toastify";
import styles from '../pages/Products/styles/Products.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../redux/brandsSlice.ts';
import { fetchAllProducts } from "../redux/productsSlice.ts";
import { RootState } from '../redux/store.ts';
import modalStyles from '../modals/Modal.module.scss';

interface AddProductProps {
  reloadProduct: () => void;
  resetFilters: () => void;
}

const AddProduct = ({ reloadProduct, resetFilters }: AddProductProps) => {
  const [showModal, setShowModal] = useState(false);
  const { add, error } = useAdd(API_URL);

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const dispatch = useDispatch();

  // Получаем фильтры из Redux
  const { page, name, sort, order, category, selectedBrand } = useSelector((state: RootState) => state.productsFilters);

  const handleSubmit = async (product: Partial<ProductInterface>) => {
    try {
      console.log('Добавление продукта:', product);
      await add(product);
      handleClose();
      toast.success('Товар успешно создан!');

      // Перезапрашиваем бренды
      dispatch(fetchBrands());

      // Перезапрашиваем продукты с текущими фильтрами
      const url = createUrl(page, name, sort, order, category, selectedBrand ? [selectedBrand] : []);
      dispatch(fetchAllProducts(url));

      // Обновляем продукты
      reloadProduct();

    } catch (error) {
      console.log('Ошибка при добавлении продукта:', error);
      toast.error('Ошибка при добавлении продукта');
    }
  };

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
  );
};

export default AddProduct;
