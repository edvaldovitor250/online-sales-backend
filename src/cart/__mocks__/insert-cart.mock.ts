/* eslint-disable prettier/prettier */
import { productMock } from "../../product/__mocks__/product.mock";
import { InsertCartDto } from "../dtos/insert-cart.dto";

export const insertCartMock: InsertCartDto = {
    productId: productMock.id,
    amount: 12
}