import {useFetch} from "../hooks/useFetch.ts";
import {TodoInterface} from "../types/Todos.Interface.ts";

const Todos = () => {
  const {data: todos, error, isLoading} = useFetch<TodoInterface>('https://jsonplaceholder.typicode.com/todos', 20)

  return (
    <div>
      <h1>Todos page</h1>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2 className="erorr">{error}</h2>}
      {!isLoading && !error && (
        <ul>{!!todos.length && todos.map((todo: TodoInterface) => (<li key={todo.id}>{todo.title}</li>))}</ul>)}
    </div>
  )
}
export default Todos