import {BrowserRouter, Route, Routes} from "react-router-dom"
import Navbar from "./components/Navbar.tsx"
import Products from "./pages/Products.tsx"
import Posts from "./pages/Posts.tsx"
import Users from "./pages/Users.tsx"
import {Provider} from "react-redux"
import {store} from "./redux/store.ts"
import Orders from "./pages/Orders.tsx"
import Register from "./components/Register.tsx"

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
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/register" element={<Register/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App