import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../redux/store'
import {
  fetchAllOrders,
  selectOrders,
  selectOrdersError,
  selectOrdersLoading,
  removeOrder,
  clearOrders
} from '../redux/orderSlice'
import {OrderInterface} from '../types/Order.interface'
import styles from "../components/Navbar/Navbar.module.scss";

const Orders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(selectOrders);
  const isLoading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);

  useEffect(() => {
    dispatch(fetchAllOrders('https://66a4ef2a5dc27a3c190a3666.mockapi.io/buyer'))
  }, [dispatch])

  const handleRemoveOrder = (orderId: string) => {

    if (window.confirm('Are you sure you want to remove this order?')) {
      dispatch(removeOrder(orderId))
        .unwrap()
        .then(() => {
          dispatch(fetchAllOrders('https://66a4ef2a5dc27a3c190a3666.mockapi.io/buyer'))
        })
        .catch((error) => {
          console.error('Failed to remove order:', error)
        })
    }
  }

  const handleClearOrders = () => {

    if (window.confirm('Are you sure you want to clear all orders?')) {
      dispatch(clearOrders())
        .unwrap()
        .then(() => {
          dispatch(fetchAllOrders('https://66a4ef2a5dc27a3c190a3666.mockapi.io/buyer'))
        })
        .catch((error) => {
          console.error('Failed to clear orders:', error)
        })
    }
  }

  return (
    <div className={styles.navbar__link}>
      <h1>Orders page</h1>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2 className="error">{error}</h2>}
      {!isLoading && !error && (
        <>
          <button onClick={handleClearOrders}>Clear All Orders</button>
          <ul>
            {orders && orders.length > 0 ? (
              orders.map((order: OrderInterface) => (
                <li key={order.id}>
                  <h3>Order ID: {order.id}</h3>
                  <p>User: {order.usersBuyer.name} {order.usersBuyer.surname}</p>
                  <p>Phone: {order.usersBuyer.phone}</p>
                  <p>Email: {order.usersBuyer.email}</p>

                  <div>
                    {order.products && order.products.length > 0 ? (
                      order.products.map((product) => (
                        <div key={product.id}>
                          <p>Product: {product.name}</p>
                          <p>Quantity: {product.quantity}</p>
                        </div>
                      ))
                    ) : (
                      <p>No products found.</p>
                    )}
                  </div>

                  <p>Total quantity: {order.totalQuantity}</p>
                  <p>Total price: ${order.totalPrice}</p>
                  <button onClick={() => handleRemoveOrder(order.id)}>Remove</button>
                </li>
              ))
            ) : (
              <p>ЗАКАЗЫ ОТСУТСВУЮТ</p>
            )}
          </ul>
        </>
      )}
    </div>
  )
}

export default Orders
