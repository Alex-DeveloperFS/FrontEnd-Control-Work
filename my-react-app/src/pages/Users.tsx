import {UserInterface} from "../types/User.interface.ts";
import {useFetch} from "../hooks/useFetch.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../redux/store.ts";
import {fetchAllUsers, selectUsers, selectUsersError, selectUsersLoading} from "../redux/userSlice.ts";
import {useEffect} from "react";

const Users = () => {

  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector(selectUsers)
  const isLoading = useSelector(selectUsersLoading)
  const error = useSelector(selectUsersError)

  useEffect(() => {
    dispatch(fetchAllUsers('https://jsonplaceholder.typicode.com/users'))
  }, [dispatch])

  return (
    <div>
      <h1>Users page</h1>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2 className="erorr">{error}</h2>}
      {!isLoading && !error && (
        <ul>{!!users.length && users.map((user: UserInterface) => (<li key={user.id}>{user.name}</li>))}</ul>)}
    </div>
  )
}

export default Users