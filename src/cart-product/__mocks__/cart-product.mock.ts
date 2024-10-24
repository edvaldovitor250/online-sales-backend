/* eslint-disable prettier/prettier */
import { productMock } from "../../product/__mocks__/product.mock";
import { CartProductEntity } from "../entities/cart-product.entity";
import { cartMock } from "./cart.mock";

export const CartProductMock:CartProductEntity = {
    id: 0,
    cartId: cartMock.id,
    productId: productMock.id,
    amount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
}