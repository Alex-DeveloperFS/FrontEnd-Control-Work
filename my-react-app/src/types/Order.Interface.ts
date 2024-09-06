import {ProductInterface} from "./Product.Interface.ts"
import {UserBuyerInterface} from "./UserBuyer.interface.ts"

export interface OrderInterface {
  id: string
  products: ProductInterface[]
  totalQuantity: number
  totalPrice: number
  usersBuyer: UserBuyerInterface
}