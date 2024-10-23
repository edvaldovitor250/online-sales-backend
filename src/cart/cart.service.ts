/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CartEntity } from './entities/cart.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertCartDto } from './dtos/insert-cart.dto';
import { CartProductService } from 'src/cart-product/cart-product.service';

@Injectable()
export class CartService {

    constructor(
        @InjectRepository(CartEntity)
        private readonly cartRepository: Repository<CartEntity>,
        private readonly cartProductService: CartProductService
    ) {}


    async findCartByUserId(userId: number, isRelations = false): Promise<CartEntity> {
        const relations = isRelations ? {
            cartProducts: {
                product: true,
            },
        } : undefined;
    
        const cart = await this.cartRepository.findOne({
            where: {
                userId,
                active: true, 
            },
            relations, 
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

    

    async insertProductInCart(insertCartDTO: InsertCartDto,userId: number,): Promise<CartEntity> {
        const cart = await this.findCartByUserId(userId).catch(async () => {
          return await this.createCart(userId);
        });
    
        await this.cartProductService.insertProductInCart(insertCartDTO, cart);
    
        return this.findCartByUserId(userId,true)
      }
    

    async getProductInCart(): Promise<CartEntity[]>{
        return this.cartRepository.find();
    }

}
