/* eslint-disable prettier/prettier */
import { categoryMock } from "../../category/__mocks__/category.mock";
import { ProductEntity } from "../entities/product.entity";

export const productMock: ProductEntity = {
    id: 0,
    name: "vitort",
    categoryId: categoryMock.id,
    price: 21.12,
    image: "432432432",
    updatedAt: new Date(),
    createdAt: new Date(),
    cartProducts: [],
    ordersProduct: []
}