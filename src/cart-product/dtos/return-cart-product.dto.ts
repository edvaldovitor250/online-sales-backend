/* eslint-disable prettier/prettier */
import { ReturnCartDto } from "../../cart/dtos/return-cart.dto";
import { ReturnProduct } from "../../product/dtos/return-product.dto";
import { CartProductEntity } from "../entities/cart-product.entity";

export class ReturnCartProductDto{
    
    readonly id: number;
    readonly cartId: number;
    readonly productId: number;
    readonly amount: number;
    readonly product: ReturnProduct;
    readonly cart?: ReturnCartDto;

    constructor(cartProduct: CartProductEntity) {
        this.id = cartProduct.id;
        this.cartId = cartProduct.cartId;
        this.productId = cartProduct.productId;
        this.amount = cartProduct.amount;
        this.product = cartProduct.product ? new ReturnProduct(cartProduct.product) : undefined;
        this.cart = cartProduct.cart ? new ReturnCartDto(cartProduct.cart) : undefined;
    }
}