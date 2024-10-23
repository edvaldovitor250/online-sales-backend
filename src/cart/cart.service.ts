/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertCartDto } from './dtos/insert-cart.dto';

@Injectable()
export class CartService {

    constructor(
        @InjectRepository(CartEntity)
        private readonly cartRepository: Repository<CartEntity>) {}

    async verifyActiveCart(userId: number): Promise<CartEntity> {
        const cart = await this.cartRepository.findOne({
            where: {
                userId,
                active: true, 
            },
        });

        if (!cart) {
            throw new NotFoundException('Active cart not found');
        }

        return cart;
    }

    async createCart(userId: number): Promise<CartEntity> {
        const newCart = this.cartRepository.create({
            active: true,
            userId,
        });
        return this.cartRepository.save(newCart);
    }

    async insertProductInCart(insertCart: InsertCartDto, userId: number): Promise<CartEntity> {
        let cart: CartEntity;

        try {
            cart = await this.verifyActiveCart(userId);
        } catch  {
            cart = await this.createCart(userId);
        }


        return cart;
    }

    async getProductInCart(): Promise<CartEntity[]>{
        return this.cartRepository.find();
    }


}
