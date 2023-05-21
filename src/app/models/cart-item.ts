import { Product } from "./product"

export class CartItem {
    addedOn! : Date
    quantity! : number
    product! : Product
    totalPrice! : number
}