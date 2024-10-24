/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartProductEntity } from './entities/cart-product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InsertCartDto } from '../cart/dtos/insert-cart.dto';
import { CartEntity } from '../cart/entities/cart.entities';
import { ProductService } from '../product/product.service';
import { UpdatetCartDto } from '../cart/dtos/update-cart.dto copy';

@Injectable()
export class CartProductService {
  
    constructor(
        @InjectRepository(CartProductEntity)
        private readonly cartProductRepository: Repository<CartProductEntity>,
        private readonly productService: ProductService
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
        
        await this.productService.findProductById(insertCartDto.productId)
        
        const cartProduct = await this.verifyProductInCart(insertCartDto.productId, cart.id).catch(() => undefined);

        if (!cartProduct) {
            return this.createProduct(insertCartDto, cart.id);
        }

        cartProduct.amount = insertCartDto.amount;

        return cartProduct;
    }

    async updateProductInCart( updateCartDTO: UpdatetCartDto,cart: CartEntity,): Promise<CartProductEntity> {
        await this.productService.findProductById(updateCartDTO.productId);
        const cartProduct = await this.verifyProductInCart(
          updateCartDTO.productId,
          cart.id,
        );
    
        return this.cartProductRepository.save({
          ...cartProduct,
          amount: updateCartDTO.amount,
        });
      }

    async deleteProductCart(productId: number, cartId: number): Promise<DeleteResult> {
        const result = await this.cartProductRepository.delete({ productId, cartId });
    
        if (result.affected === 0) {
            throw new NotFoundException(`Product with ID ${productId} not found in cart ${cartId}`);
        }
    
        return result;
    }
}
