import {NavLink, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../redux/store.ts'
import {login, logout} from '../../redux/authSlice.ts'
import Card from "../Card/Card.tsx"
import {RiAdminFill} from "react-icons/ri"
import {FaRegUser} from "react-icons/fa"
import {MdAppRegistration} from "react-icons/md"
import useModalMenu from '../../hooks/useModalMenu.ts'

import styles from './Navbar.module.scss'

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isMobile} = useModalMenu()
  const {isLogged} = useSelector((state: RootState) => state.auth)

  const handleLogin = () => {
    dispatch(login())
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className={styles.navbar}>

      <p className={styles.navbar__title}>Choose with comfort</p>

      <div className={styles.navbar__container}>
        <div className={styles.navbar__logo}>
          <p className={styles.navbar__logo_text}>SMARTSHOP<span className={styles.navbar__logo_span}>.COM</span></p>
        </div>

        <ul className={styles.navbar__list}>
          {isMobile && (
            isLogged ? (
              <li>
                <button onClick={handleLogout} className={styles.navbar__link}>
                  <RiAdminFill/>
                </button>
              </li>
            ) : (
              <>
                <li className="cart">
                  <Card product={{id: '', name: '', brand: '', description: '', category: '', price: 0, image: ''}}/>
                </li>
                <li>
                  <button onClick={handleLogin} className={styles.navbar__link}>
                    <FaRegUser/>
                  </button>
                </li>
              </>
            )
          )}
        </ul>

        {!isMobile && (
          <ul className={styles.navbar__list}>

            <NavLink to="/" className={styles.navbar__link}>
              Products
            </NavLink>

            <NavLink to="/posts" className={styles.navbar__link}>
              Posts
            </NavLink>

            {isLogged ? null : (
              <li className="navbar__item basket">
                <Card product={{id: '', name: '', brand: '', description: '', category: '', price: 0, image: ''}}/>
              </li>
            )}

            {isLogged ? (
              <>
                <li className={styles.navbar__link}>
                  <NavLink to="/orders" className={styles.link}>
                    Orders
                  </NavLink>
                </li>
                <li className={styles.navbar__link}>
                  <NavLink to="/users">
                    Users
                  </NavLink>
                </li>
              </>
            ) : null}

            {isLogged ? (
              <li>
                <button onClick={handleLogout} className={styles.navbar__link}>
                  <RiAdminFill/>
                </button>
              </li>
            ) : (
              <li>
                <button onClick={handleLogin} className={styles.navbar__link}>
                  <FaRegUser/>
                </button>
              </li>
            )}

            <NavLink to="/register" className={styles.navbar__link}>
              <MdAppRegistration/>
            </NavLink>
          </ul>
        )
        }
      </div>

      <div className={styles.navbar__photos}>
        <img src="/img/Smartphones.jpg" alt="image" className={styles.navbar__img}/>
        <img src="/img/qq20220704170026-1.jpg" alt="image" className={styles.navbar__img}/>
        <img src="/img/Headphones.jpg" alt="image" className={styles.navbar__img}/>
        <img src="/img/Accessories.jpg" alt="image" className={styles.navbar__img}/>
        <img src="/img/Cameras.jpg" alt="image" className={styles.navbar__img}/>
        <img src="/img/Best-Graphics-Cards-For-Gaming.jpg" alt="image" className={styles.navbar__img}/>
        <img src="/img/qq20220704170026-1.jpg" alt="image" className={styles.navbar__img}/>
      </div>
    </nav>
  )
}

export default Navbar
