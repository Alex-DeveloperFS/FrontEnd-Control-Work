import {useDispatch, useSelector} from "react-redux"
import {AppDispatch, RootState} from "../../../redux/store.ts"
import {login, logout} from "../../../redux/authSlice.ts"
import {RiAdminFill} from "react-icons/ri"
import Cart from "../../Cart/Cart.tsx"
import {FaRegUser} from "react-icons/fa"
import {NavLink, useNavigate} from "react-router-dom"
import {MdAppRegistration} from "react-icons/md"

import styles from "./Logins.module.scss"

const Logins = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const {isLogged} = useSelector((state: RootState) => state.auth)

  const handleLogin = () => {
    dispatch(login())
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <div>
      <ul className={styles.navbar__list}>
        <div className={styles.navbar__logo}>
          <p>SMARTSHOP<span className={styles.navbar__logo_span}>.COM</span></p>
        </div>

        <NavLink to="/" className={styles.navbar__link}>
          Products
        </NavLink>

        <NavLink to="/posts" className={styles.navbar__link}>
          Posts
        </NavLink>

        {isLogged ? null : (
          <li className="navbar__item">
            <Cart product={{id: '', name: '', brand: '', description: '', category: '', price: 0, image: ''}}/>
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
    </div>
  )
}

export default Logins