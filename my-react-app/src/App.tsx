import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import Products from "./pages/Products.tsx";
import Posts from "./pages/Posts.tsx";
import Users from "./pages/Users.tsx";
import Todos from "./pages/Todos.tsx";
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Products/>}/>
            <Route path="/posts" element={<Posts/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/todos" element={<Todos/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}
export default App