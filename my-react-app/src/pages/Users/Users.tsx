import {FC, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../redux/store.ts'
import {
  clearUsers,
  fetchAllUsers,
  removeUsers,
  selectUsers,
  selectUsersError,
  selectUsersLoading
} from '../../redux/userSlice.ts'
import styles from "./Users.module.scss"
import useModalMenu from "../../hooks/useModalMenu.ts"
import Modal from "../../modals/Modal.tsx"
import modalStyles from "../../modals/Modal.module.scss"
import Logins from "../../components/Navbar/Logins/Logins.tsx"
import {UserInterface} from "../../types/User.Interface.ts"

const Users: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector(selectUsers)
  const isLoading = useSelector(selectUsersLoading)
  const error = useSelector(selectUsersError)
  const {isMenuOpen, isMobile, openMenu, closeMenu} = useModalMenu()

  useEffect(() => {
    dispatch(fetchAllUsers('https://66d6c219006bfbe2e64e791a.mockapi.io/users'))
  }, [dispatch]);

  const handleRemoveUsers = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(removeUsers(userId))
        .unwrap()
        .then(() => {
          dispatch(fetchAllUsers('https://66d6c219006bfbe2e64e791a.mockapi.io/users'))
        })
        .catch((error) => {
          console.error('Failed to delete user:', error)
        })
    }
  }

  const handleClearUsers = () => {
    if (window.confirm('Are you sure you want to clear all users?')) {
      dispatch(clearUsers())
        .unwrap()
        .then(() => {
          dispatch(fetchAllUsers('https://66d6c219006bfbe2e64e791a.mockapi.io/users'))
        })
        .catch((error) => {
          console.error('Failed to clear users:', error)
        })
    }
  }

  const handleBurgerClick = () => {
    if (!isMenuOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  return (
    <>
      {isMobile && (
        <button onClick={handleBurgerClick} className={styles.burger}>
          <span className={styles.burger__line}></span>
          <span className={styles.burger__line}></span>
          <span className={styles.burger__line}></span>
        </button>
      )}

      {isMenuOpen && (
        <Modal onClose={closeMenu} className={modalStyles.modal__overlay_cat}>
          <Logins/>
          <div className={styles.height}></div>
        </Modal>
      )}

      <h1 className={styles.users__title}>USERS</h1>
      <div className={styles.users__container}>

        {isLoading && <h2 className="loading">Loading...</h2>}
        {error && <h2 className="error">{error}</h2>}
        {!isLoading && !error && users.length > 0 && (
          <>
            <button className={styles.btn__clear} onClick={handleClearUsers}>Clear all users</button>

            <ul className={styles.users__content}>
              {users.map((user: UserInterface) => (
                <li key={user.id} className={styles.user__list}>
                  <div className={styles.user__items}>
                    <p className={styles.user__id}>ID:</p>
                    <p className={styles.user__name}>Name:</p>
                    <p className={styles.user__email}>Email:</p>
                    <p className={styles.user__password}>Password:</p>
                    <p className={styles.user__date}>Date:</p>

                    <p className={styles.user__id_map}>{user.id}</p>
                    <p className={styles.user__name_map}>{user.usersData.username}</p>
                    <p className={styles.user__email_map}>{user.usersData.email}</p>
                    <p className={styles.user__password_map}>{user.usersData.password}</p>
                    <p className={styles.user__date_map}>{(new Date(user.createdAt)).toLocaleString()}</p>
                  </div>
                  <div className={styles.btn__group}>
                    <button className={styles.btn__group_item} onClick={() => handleRemoveUsers(user.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {!isLoading && !error && users.length === 0 && <h2 className="error">Users not found</h2>}
      </div>
    </>
  )
}

export default Users
