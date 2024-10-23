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

    async findCartByUserId(userId: number,isRelations?: boolean,): Promise<CartEntity> {
        let query = this.cartRepository
          .createQueryBuilder('cart')
          .where('cart.userId = :userId', { userId })
          .andWhere('cart.active = :active', { active: true });
    
        if (isRelations) {
          query = query
            .leftJoinAndSelect('cart.cartProducts', 'cartProducts')
            .leftJoinAndSelect('cartProducts.product', 'product');
        }
    
        const cart = await query.getOne();
    
        if (!cart) {
          throw new NotFoundException('Cart active not found');
        }
        return cart;
      }

    

    async insertProductInCart(insertCartDTO: InsertCartDto,userId: number,): Promise<CartEntity> {
        const cart = await this.findCartByUserId(userId).catch(async () => {
          return await this.createCart(userId);
        });
    
        await this.cartProductService.insertProductInCart(insertCartDTO, cart);
    
        return cart;
      }
    

    async getProductInCart(): Promise<CartEntity[]>{
        return this.cartRepository.find();
    }

}
