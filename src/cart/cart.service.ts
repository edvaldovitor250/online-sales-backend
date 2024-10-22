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
        private readonly cardRepository: Repository<CartEntity>) {}

        async verifyActiveCart(userId:number):Promise<CartEntity>{
            const card =  await this.cardRepository.findOne({
                where: {
                    userId,
                }
            })

            if(!card){
                throw new NotFoundException("Cart active not found")
            }

            return card;
        }

        async createCart(userId:number): Promise<CartEntity> {
            return this.cardRepository.save({
                active:true,
                userId
            })
        }
        
        async insertProductInCard(insertCart:InsertCartDto,userId:number) :Promise<CartEntity>{
            const card = await this.verifyActiveCart(userId).catch(async() => {
                return await this.createCart(userId)
            });

            return card;
            
        }
    }
    
