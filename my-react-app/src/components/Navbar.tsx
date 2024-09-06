import {NavLink, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../redux/store.ts'
import {login, logout} from '../redux/authSlice.ts'
import Basket from "./Basket.tsx"
import styles from './Navbar.module.scss'
import {RiAdminFill} from "react-icons/ri";
import {FaRegUser} from "react-icons/fa";
import {MdAppRegistration} from "react-icons/md";

const Navbar = () => {
  const dispatch = useDispatch()
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
    <nav className={styles.navbar}>
      <p className={styles.navbar__header}>Choose with comfort</p>
      <div className={styles.navbar__container}>

        <div className={styles.navbar__logo}>
          <p>LOGO</p>

        </div>

        <ul className={styles.navbar__list}>

          <NavLink to="/" className={styles.navbar__link}>
            Products
          </NavLink>

          <NavLink to="/posts" className={styles.navbar__link}>
            Posts
          </NavLink>


          {isLogged ? null : (
            <li className="navbar__item basket">
              <Basket product={{id: '', name: '', description: '', category: '', price: '', image: ''}}/>
            </li>
          )}

          {isLogged ? (
            <>
              <li>
                <NavLink to="/orders" className={styles.navbar__link}>
                  Orders
                </NavLink>
              </li>
              <li>
                <NavLink to="/users" className={styles.navbar__link}>
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

          <NavLink to="/posts" className={styles.navbar__link}>
            <MdAppRegistration/>
          </NavLink>
        </ul>
      </div>
      <div className={styles.navbar__photos}>


      </div>


    </nav>
  )
}

export default Navbar