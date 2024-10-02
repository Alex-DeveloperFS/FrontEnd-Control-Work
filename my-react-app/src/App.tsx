import {BrowserRouter, Route, Routes} from "react-router-dom"
import Navbar from "./components/Navbar/Navbar.tsx"
import Products from "./pages/Products/Products.tsx"
import Posts from "./pages/Posts/Posts.tsx"
import Users from "./pages/Users/Users.tsx"
import {Provider} from "react-redux"
import {store} from "./redux/store.ts"
import Orders from "./pages/Orders/Orders.tsx"
import Register from "./pages/Register/Register.tsx"
import Footer from "./components/Footer/Footer.tsx"

const App = () => {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar/>
        <div className="container">
          <Routes>
            <Route path="/" element={<Products/>}/>
            <Route path="/posts" element={<Posts/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/register" element={<Register/>}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </Provider>
  )
}

export default App