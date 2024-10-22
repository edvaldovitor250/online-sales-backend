/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { categoryMock } from "../../category/__mocks__/category.mock";
import { CreateProductDto } from "../dtos/create-product.dto";

export const createProductMock: CreateProductDto = {

    name: "Arroz",
    categoryId: categoryMock.id,
    price: 2332,
    image: "sdfdsfds"
}