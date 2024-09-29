import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../redux/store.ts'
import {
  fetchAllOrders,
  selectOrders,
  selectOrdersError,
  selectOrdersLoading,
  removeOrder,
  clearOrders
} from '../../redux/orderSlice.ts'
import {OrderInterface} from '../../types/Order.Interface.ts'
import styles from "./Orders.module.scss";

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
    <>
      <h1 className={styles.orders__title}>ORDERS</h1>
      <div className={styles.orders__container}>
        {isLoading && <h2 className="loading">Loading...</h2>}
        {error && <h2 className="error">{error}</h2>}
        {!isLoading && !error && (
          <>
            <button onClick={handleClearOrders} className={styles.btn__clear}>Clear All Orders</button>

            <ul>
              {orders && orders.length > 0 ? (
                orders.map((order: OrderInterface) => (

                  <li key={order.id} className={styles.order__list}>

                    <h3 className={styles.order__number}>Order: {order.id}</h3>

                    <div className={styles.order__content}>
                      <div className={styles.order__product}>
                        {order.products && order.products.length > 0 ? (
                          order.products.map((product) => (

                            <div key={product.id} className={styles.order__items}>
                              <img src={product.image} alt="image" className={styles.order__image}/>


                              <p className={styles.order__name}>NAME:</p>
                              <p className={styles.order__price}>PRICE:</p>
                              <p className={styles.order__quantity}>PCS:</p>


                              <p className={styles.order__name_product}>Product: {product.name}</p>
                              <p className={styles.order__price_product}>{product.price}$</p>
                              <p className={styles.order__quantity_product}>{product.quantity}</p>
                            </div>
                          ))
                        ) : (
                          <p>No products found.</p>
                        )}
                      </div>
                      <div className={styles.order__user}>

                        <div className={styles.users__list}>

                          <p className={styles.user__name}>USER:</p>
                          <p className={styles.user__phone}>PHONE:</p>
                          <p className={styles.user__email}>EMAIL:</p>
                          <p className={styles.user__quantity}>TOTAL QUANTITY:</p>
                          <p className={styles.user__price}>TOTAL PRICE:</p>


                          <p className={styles.user__name_bayer}>{order.usersBuyer.name} {order.usersBuyer.surname}</p>
                          <p className={styles.user__phone_bayer}>{order.usersBuyer.phone}</p>
                          <p className={styles.user__email_bayer}>{order.usersBuyer.email}</p>
                          <p className={styles.user__quantity_bayer}>{order.totalQuantity}</p>
                          <p className={styles.user__price_bayer}>{order.totalPrice}$</p>
                        </div>

                        <div className={styles.btn__group}>
                          <button className={styles.btn__group_item} onClick={() => handleRemoveOrder(order.id)}>Delete
                          </button>
                          <button className={styles.btn__group_item}>Confirm order</button>
                        </div>

                      </div>
                    </div>


                  </li>
                ))
              ) : (
                <h2 className="error">Orders not found</h2>
              )}

            </ul>
          </>
        )}
      </div>
    </>
  )
}

export default Orders
