import { NavLink, useNavigate } from 'react-router-dom';
import { LinkInterface } from '../types/Link.interface.ts';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store.ts';
import { login, logout } from '../redux/authSlice.ts';
import Basket from './Basket.tsx';
import styles from './Navbar.module.scss';
import InputField from './form/InputField.tsx';
import SelectField from './form/SelectField.tsx';
import { ORDER_BY_LIST, SORT_BY_LIST } from '../data/mockData.ts';
import { MdRefresh } from 'react-icons/md';
import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchAllProducts } from '../redux/productsSlice.ts';
import { createUrl } from '../utils/mockApi.ts';

const links: LinkInterface[] = [
  { path: '/', name: 'Products' },
  { path: '/posts', name: 'Posts' },
  { path: '/register', name: 'Register' },
];

const Navbar = () => {
  const [name, setName] = useState('');
  const [sort, setSort] = useState('');
  const [order, setOrder] = useState('');
  const [category, setCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [page, setPage] = useState(1); // Assuming you have pagination
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLogged } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchAllProducts(createUrl(page, name, sort, order, category, selectedBrand ? [selectedBrand] : [])));
  }, [name, sort, order, category, selectedBrand, page, dispatch]);

  const resetFilters = useCallback(() => {
    setName('');
    setSort('');
    setOrder('');
    setCategory('');
    setSelectedBrand(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, []);

  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <p className={styles.navbar__header}>Choose with comfort</p>
      <div className={styles.navbar__container}>
        <ul className={styles.navbar__list}>
          {links.map((link: LinkInterface, index: number) => (
            <li key={index} className={styles.navbar__item}>
              <NavLink to={link.path} className={styles.navbar__link}>
                {link.name}
              </NavLink>
            </li>
          ))}

          {!isLogged && (
            <li className="navbar__item basket">
              <Basket product={{ id: '', name: '', description: '', category: '', price: '', image: '' }} />
            </li>
          )}

          {isLogged && (
            <>
              <li className={styles.navbar__item}>
                <NavLink to="/orders" className={styles.navbar__link}>
                  Orders
                </NavLink>
              </li>
              <li className={styles.navbar__item}>
                <NavLink to="/users" className={styles.navbar__link}>
                  Users
                </NavLink>
              </li>
              <li className={styles.navbar__item}>
                <button onClick={handleLogout} className={styles.navbar__link}>
                  Admin
                </button>
              </li>
            </>
          )}

          {!isLogged && (
            <li className={styles.navbar__item}>
              <button onClick={handleLogin} className={styles.navbar__link}>
                User
              </button>
            </li>
          )}
        </ul>
      </div>

      <div className="products-filter">
        <InputField
          ref={inputRef}
          id="filter"
          type="text"
          placeholder="Filter products by name..."
          onChange={(e) => setName(e.target.value)} // Removed debouncedSetName for simplicity
        />

        <SelectField id="sort" value={sort} onChange={(e) => setSort(e.target.value)} options={SORT_BY_LIST} />
        <SelectField id="order" value={order} onChange={(e) => setOrder(e.target.value)} options={ORDER_BY_LIST} />

        <button onClick={resetFilters}>
          <MdRefresh />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
