import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store.ts";
import {login, logout} from "../../redux/authSlice.ts";
import styles from "./Navbar.module.scss";
import {RiAdminFill} from "react-icons/ri";
import Card from "../Card/Card.tsx";
import {FaRegUser} from "react-icons/fa";
import {NavLink, useNavigate} from "react-router-dom";

const Logins = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLogged} = useSelector((state: RootState) => state.auth)

  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div>
      <ul className={styles.navbar__list}>

        <NavLink to="/" className={styles.navbar__link}>
          Products
        </NavLink>

        <NavLink to="/posts" className={styles.navbar__link}>
          Posts
        </NavLink>


        {isLogged ? null : (
          <li className="navbar__item basket">
            <Card product={{id: '', name: '', description: '', category: '', price: '', image: ''}}/>
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
              <NavLink to="/users" >
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



      </ul>

    </div>
  )
}
export default Logins