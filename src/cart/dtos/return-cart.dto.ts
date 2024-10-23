/* eslint-disable prettier/prettier */
import { ReturnCartProductDto } from "src/cart-product/dtos/return-cart-product.dto";
import { CartEntity } from "../entities/cart.entities";

export class ReturnCartDto {
    id: number;
    cartProducts?: ReturnCartProductDto[];

    constructor(cart: CartEntity) {
        this.id = cart.id;

        this.cartProducts = cart.cartProducts 
            ? cart.cartProducts.map(cartProduct => new ReturnCartProductDto(cartProduct)) 
            : undefined;
    }
}
