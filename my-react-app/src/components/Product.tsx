import {ProductInterface} from '../types/Product.interface.ts';
import {FaTrash} from 'react-icons/fa6';
import {FaEdit} from 'react-icons/fa';
import {AxiosError} from 'axios';
import {API_URL} from '../utils/mockApi.ts';
import {useDelete} from '../hooks/useDelete.ts';
import EditProduct from './EditProduct.tsx';
import BuyProduct from "./BuyProduct/BuyProduct.tsx";
import AddToBasket from "./AddToBasket.tsx";
import {RootState} from "../redux/store.ts";
import {useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import { useDispatch } from 'react-redux';
import { fetchBrands } from '../redux/brandsSlice.ts';
import styles from '../pages/Products/styles/Products.module.scss';

interface ProductPropsInterface {
  product: ProductInterface;
  reloadProduct: () => void;
  resetFilters: () => void; // Добавляем resetFilters как параметр
}

const Product = ({ product: {id, brand, name, description, category, price, image}, reloadProduct, resetFilters }: ProductPropsInterface) => {
  const {isLogged} = useSelector((state: RootState) => state.auth);
  const {delete: deleteProduct} = useDelete(API_URL);

  const dispatch = useDispatch();

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(id);
      toast.success('Товар успешно удален!');
      resetFilters();
      reloadProduct();
      dispatch(fetchBrands());
    } catch (error) {
      console.log((error as AxiosError).message);
      toast.error('Ошибка при удалении продукта');
    }
  }

  return (
    <li className={styles.product__items}>
      <h2 className={styles.product_item__title}>{name}</h2>
      <p className={styles.product_item__brand}>{brand}</p>
      <p className={styles.product_item__description}>{description}</p>
      <p className={styles.product_item__category}>{category}</p>
      <p className={styles.product_item__price}>{price}</p>
      <img className={styles.product_item__image} src={image} alt={name} />

      {isLogged ? (
        <div className={styles.product__actions}>
          <button className={styles.btn__delete} onClick={handleDeleteProduct}>
            <FaTrash />
          </button>
          <EditProduct product={{id, brand, name, description, category, price, image}} reload={reloadProduct}>
            <FaEdit />
          </EditProduct>
        </div>
      ) : (
        <div className={styles.product__actions}>
          <BuyProduct product={{id, brand, name, description, category, price, image}}/>
          <AddToBasket product={{id, brand, name, description, category, price, image}}/>
        </div>
      )}
    </li>
  );
}

export default Product;
