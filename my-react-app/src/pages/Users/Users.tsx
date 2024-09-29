import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store.ts'
import {clearUsers, fetchAllUsers, removeUsers, selectUsers, selectUsersError, selectUsersLoading} from '../../redux/userSlice.ts'
import styles from "./Users.module.scss"

const Users: FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector(selectUsers)
  const isLoading = useSelector(selectUsersLoading)
  const error = useSelector(selectUsersError)

  useEffect(() => {
    dispatch(fetchAllUsers('https://66d6c219006bfbe2e64e791a.mockapi.io/users'))
  }, [dispatch]);

  const handleRemoveUsers = (userId: string) => {

    if (window.confirm('Вы уверены, что хотите удалить этого пользователя?')) {
      dispatch(removeUsers(userId))

        .unwrap()

        .then(() => {
          dispatch(fetchAllUsers('https://66d6c219006bfbe2e64e791a.mockapi.io/users'))
        })

        .catch((error) => {
          console.error('Не удалось удалить пользователя:', error)
        })
    }
  }

  const handleClearUsers = () => {

    if (window.confirm('Вы уверены, что хотите очистить всех пользователей?')) {
      dispatch(clearUsers())

        .unwrap()

        .then(() => {
          dispatch(fetchAllUsers('https://66d6c219006bfbe2e64e791a.mockapi.io/users'))
        })

        .catch((error) => {
          console.error('Не удалось очистить пользователей:', error)
        })
    }
  }

  return (
   <>
      <h1 className={styles.users__title}>USERS</h1>
    <div className={styles.users__container}>

      {isLoading && <h2 className="loading">Loading...</h2>}
      {error && <h2 className="error">{error}</h2>}
      {!isLoading && !error && users.length > 0 && (
        <>
          <button className={styles.btn__clear} onClick={handleClearUsers}>Clear all users</button>

          <ul className={styles.users__content}>
            {users.map((user) => (
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
