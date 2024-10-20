/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { categoryMock } from "../../category/__mocks__/category.mock";
import { CreateProductDto } from "../dtos/create-product.dto";

export const updateProductMock: CreateProductDto = {

    name: "4324",
    categoryId: categoryMock.id,
    price: 2332,
    image: "sdfdsfds"
}