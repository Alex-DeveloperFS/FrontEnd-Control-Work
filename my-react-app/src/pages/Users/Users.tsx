import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../redux/store.ts'
import {clearUsers, fetchAllUsers, removeUsers, selectUsers, selectUsersError, selectUsersLoading} from '../redux/userSlice.ts'

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
    <div className="users-container">

      <h1>Пользователи</h1>
      {isLoading && <h2>Загрузка...</h2>}
      {error && <h2 className="error">{error}</h2>}
      {!isLoading && !error && users.length > 0 && (
        <>
          <button onClick={handleClearUsers}>Очистить всех пользователей</button>

          <ul className="users-list">
            {users.map((user) => (
              <li key={user.id} className="user-item">

                <div className="user-details">
                  <h2>ID пользователя: {user.id}</h2>
                  <p><strong>Имя пользователя:</strong> {user.usersData.username}</p>
                  <p><strong>Email:</strong> {user.usersData.email}</p>
                  <p><strong>Пароль:</strong> {user.usersData.password}</p>
                  <p><strong>Подтверждение пароля:</strong> {user.usersData.confirmPassword}</p>
                  <p><strong>Дата регистрации:</strong> {(new Date(user.createdAt)).toLocaleString()}</p>
                </div>

                <button onClick={() => handleRemoveUsers(user.id)}>Удалить</button>
              </li>
            ))}
          </ul>
        </>
      )}

      {!isLoading && !error && users.length === 0 && <h2>Пользователи не найдены</h2>}
    </div>
  )
}

export default Users
