/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductEntity } from './entities/cart-product.entity';
import { Repository } from 'typeorm';
import { InsertCartDto } from 'src/cart/dtos/insert-cart.dto';
import { CartEntity } from 'src/cart/entities/cart.entities';

@Injectable()
export class CartProductService {
    constructor(
        @InjectRepository(CartProductEntity)
        private readonly cartProductRepository: Repository<CartProductEntity>,
    ) {}

    async verifyProductInCart(productId: number, cartId: number): Promise<CartProductEntity> {
        const cartProduct = await this.cartProductRepository.findOne({
            where: {
                productId,
                cartId,
            },
        });

        if (!cartProduct) {
            throw new NotFoundException('Product not found in cart');
        }

        return cartProduct;
    }

    async createProduct(insertCartDto: InsertCartDto, cartId: number): Promise<CartProductEntity> {
        return this.cartProductRepository.save({
            amount: insertCartDto.amount,
            productId: insertCartDto.productId,
            cartId,
        });
    }

    async insertProductInCart(insertCartDto: InsertCartDto, cart: CartEntity): Promise<CartProductEntity> {
        const cartProduct = await this.verifyProductInCart(insertCartDto.productId, cart.id).catch(() => undefined);

        if (!cartProduct) {
            return this.createProduct(insertCartDto, cart.id);
        }

        cartProduct.amount = insertCartDto.amount;

        return this.cartProductRepository.save(cartProduct);
    }
}
